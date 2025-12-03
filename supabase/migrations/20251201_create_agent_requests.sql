create table if not exists agent_requests (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  business_name text not null,
  agent_role text not null,
  requirements text not null,
  status text default 'pending' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table agent_requests enable row level security;

-- Allow users to insert their own requests
create policy "Users can insert their own requests"
  on agent_requests for insert
  with check (auth.uid() = user_id);

-- Allow users to view their own requests
create policy "Users can view their own requests"
  on agent_requests for select
  using (auth.uid() = user_id);
