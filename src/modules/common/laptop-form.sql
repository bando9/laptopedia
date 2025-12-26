Table laptop {
  id integer [PK, increment]
  brand_id integer [ref: > brand.id, not null]
  model varchar [not null] 
  slug varchar [not null, unique]
  cpu_id integer [ref: > cpu.id, not null]
  gpu_id integer [ref: > gpu.id, not null] 
  ram_id integer [ref: <> ram.id, not null]
  storage_id integer [ref: <> storage.id, not null]
  display_id integer [ref: > display.id]
  battery varchar 
  weight varchar
  release_year smallinteger
  price integer
  created_at timestamp
  updated_at timestamp
}

Table brand {
  id integer [PK]
  name varchar [unique]
  code varchar [unique]
  image varchar
}

Table cpu {
  id integer [PK]
  name varchar
  code varchar
}

Table gpu {
  id integer [PK]
  name varchar
  code varchar
}

Table ram {
  id integer [PK]
  size integer 
  type varchar
}

Enum type_storage{
  HDD
  SSD
}

Table storage {
  id integer [PK]
  size integer
  type type_storage
}

Table display {
  id integer [PK]
  size integer 
  type varchar
  resolution varchar
}



