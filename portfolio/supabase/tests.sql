-- Run against a TEST Supabase database after 001_content.sql. All changes roll back.
begin;
insert into auth.users(id) values ('00000000-0000-0000-0000-000000000001'), ('00000000-0000-0000-0000-000000000002');
delete from public.portfolio_owner;
insert into public.portfolio_owner(user_id) values ('00000000-0000-0000-0000-000000000001');
insert into public.portfolio_content(id,kind,title,published) values
('10000000-0000-0000-0000-000000000001','book','Test public',true),
('10000000-0000-0000-0000-000000000002','book','Test draft',false);
set local role anon;
do $$ begin
 if (select count(*) from public.portfolio_content where id::text like '10000000-%') <> 1 then raise exception 'Anonymous visibility failed'; end if;
 begin
  insert into public.portfolio_content(kind,title) values ('book','Forbidden');
  raise exception 'Anonymous insert allowed';
 exception when insufficient_privilege then null; end;
end $$;
reset role;
set local role authenticated;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000002',true);
do $$ declare n integer; begin
 if (select count(*) from public.portfolio_content where id::text like '10000000-%') <> 1 then raise exception 'Non-owner reads drafts'; end if;
 update public.portfolio_content set title='Forbidden' where id='10000000-0000-0000-0000-000000000001';
 get diagnostics n = row_count; if n <> 0 then raise exception 'Non-owner update allowed'; end if;
 delete from public.portfolio_content where id='10000000-0000-0000-0000-000000000001';
 get diagnostics n = row_count; if n <> 0 then raise exception 'Non-owner delete allowed'; end if;
 begin
  insert into public.portfolio_content(kind,title) values ('book','Forbidden');
  raise exception 'Non-owner insert allowed';
 exception when insufficient_privilege then null; end;
 begin
  update public.portfolio_owner set user_id='00000000-0000-0000-0000-000000000002';
  raise exception 'Owner escalation allowed';
 exception when insufficient_privilege then null; end;
end $$;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000001',true);
do $$ declare n integer; begin
 if (select count(*) from public.portfolio_content where id::text like '10000000-%') <> 2 then raise exception 'Owner draft access failed'; end if;
 insert into public.portfolio_content(id,kind,title) values ('10000000-0000-0000-0000-000000000003','plan','Owner created');
 update public.portfolio_content set title='Owner updated' where id='10000000-0000-0000-0000-000000000003';
 get diagnostics n = row_count; if n <> 1 then raise exception 'Owner update failed'; end if;
 delete from public.portfolio_content where id='10000000-0000-0000-0000-000000000003';
 get diagnostics n = row_count; if n <> 1 then raise exception 'Owner delete failed'; end if;
end $$;
reset role;
rollback;
