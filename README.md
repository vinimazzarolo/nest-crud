## Como executar
Passo a passo:
1. Criar um `.env` e preencher as variáveis conforme o arquivo `.env.sample`
1. ```docker-compose up --build```
2. ```docker exec -it nest-crud-db bash```
3. ```mysql -uroot -p```
4. Informar a senha: ```"nest"```
5. ```create database nest```

OBS: alvez seja necessário interromper a execução dos containers docker após a criação do banco de dados. Para isso, basta apertar `CTRL + C` e em seguida executar `docker-compose up`.

## Endpoints
`POST`: Cadastrar uma pessoa e seus endereços: `http://localhost:3000/people`. Exemplo do que deve ser enviado no `body` da requisição:
```json
{
	"name": "Vini",
	"identification": "00000000000",
	"type": 1,
	"birthDate": "2022-07-24",
	"addresses": [
		{
			"street": "Rua Lorem Ipsum",
			"cep": "95330-000",
			"number": 11,
			"neighbourhood": "Centro",
			"city": "Veranópolis",
			"state": "RS",
			"type": 1
		}
	]
}
```
`GET`: Obter todas as pessoas: `http://localhost:3000/people`

`GET`: Obter uma pessoa pelo ID: `http://localhost:3000/people/{id}`

`PUT`: Atualiza uma pessoa e seus endereços: ```http://localhost:3000/people/{id}```. Exemplo do que deve ser enviado no `body` da requisição:
```json
{
	"name": "Vini",
	"identification": "00000000000",
	"type": 1,
	"birthDate": "2022-07-24",
	"addresses": [
		{
      "id": 1,
			"street": "Rua Lorem Ipsum Updated!!!",
			"cep": "95330-000",
			"number": 22,
			"neighbourhood": "Centro",
			"city": "Veranópolis",
			"state": "RS",
			"type": 1
		}
	]
}
```

`DELETE`: Remove uma pessoa pelo ID: `http://localhost:3000/people/{id}`.