create table usuarios(
id serial primary key, 
  nome text not null, 
  email text not null unique, 
  senha text not null 
)

create table categorias(
id serial primary key, 
  descricao text, 
  
)

create table transacoes(
id serial primary key, 
  descricao text,
  valor integer,
  data date , 
  categoria_id references categoria(id),
  usuario_id references usuarios(id), 
  tipo text not null
)
