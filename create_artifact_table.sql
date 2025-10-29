-- artifact 테이블 생성
create table if not exists public.artifact (
  id uuid primary key default gen_random_uuid(),
  user_id text,
  kind text check (kind in ('text','image','audio')) default 'text',
  content_url text,
  text_content text,
  is_public boolean default true,
  created_at timestamptz default now()
);

-- RLS 활성화
alter table public.artifact enable row level security;

-- 정책 생성: 인증된 사용자는 자기 데이터 읽기/쓰기
create policy "artifact_owner_read" on public.artifact
  for select using (auth.role() = 'authenticated' and (user_id is null or auth.uid()::text = user_id));

create policy "artifact_owner_write" on public.artifact
  for insert with check (auth.role() = 'authenticated' or true);

create policy "artifact_public_read" on public.artifact
  for select using (is_public = true);

-- 인덱스 추가
create index if not exists artifact_user_id_idx on public.artifact(user_id);
create index if not exists artifact_created_at_idx on public.artifact(created_at);

-- 댓글
comment on table public.artifact is '사용자가 만든 아티팩트 (텍스트, 이미지, 오디오)';
comment on column public.artifact.user_id is '사용자 ID';
comment on column public.artifact.kind is '아티팩트 종류 (text/image/audio)';
comment on column public.artifact.content_url is '콘텐츠 URL 또는 메타데이터 (색상 등)';
comment on column public.artifact.text_content is '텍스트 내용';
comment on column public.artifact.is_public is '공개 여부';

