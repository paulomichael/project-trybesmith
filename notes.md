`
      1:N        1:N
User ---< Order ---< Product
    places    contains
`

User:
id(PK)
username
classe
level
password

Order:
id(PK)
userId(FK)

Product:
id(PK)
name
amount
orderId(FK)

