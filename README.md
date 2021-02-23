# Byco App

Byco é um App escrito em react native que tem a pretensão de ser um "catálogo de diaristas".

## Terceiro commit - 23/02/2021
* App está funcional.
* Api: https://api.xso.com.br/devbarber/
* Reducer foi configurado para armazenar favorites e appointments, além dos dados que já armazenava.
* Views de Favorites e Appointments tiveram o código refeito para mostrar os dados direto do context em vez de fazer uma requisiçào à Api para isso.
* Próximos objetivos: 
  * configurar reload automático das informações que estão no context quando o usuário favoritar/desfavoritar algum registro.
  * configurar reload automático das informações que estão no context quando o usuário criar um novo agendamento.

## Segundo commit - 22/02/2021
* App está funcional.
* Api: https://api.xso.com.br/devbarber/
* Reducer foi configurado para armazenar nome e email, além do avatar que já armazenava.
* View de profile foi refeita e agora puxa os dados diretamente do context, e nao mais realiza uma request à Api para isso.
* Próximos objetivos: colocar a lista de favoritos no reducer também e modificar a view "Favorites" para exibir os dados a partir de lá.

## Primeiro commit - 22/02/2021

* App está funcional.
* Api: https://api.xso.com.br/devbarber/
* Troca de Avatar é feita por uma view separada da view de Profile.
* A intenção a partir daqui é implementar favorites, appointments e dados do profile (além do avatar) no reducer.