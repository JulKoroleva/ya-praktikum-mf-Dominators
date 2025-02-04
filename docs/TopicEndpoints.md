# Topic endpoinst

### 1. GET /forum
Получить список топиков. 
На данной ручке настроена пагинация, в стандартном случае всегда отдаст первую страницу.
Количество записей на странице - фиксированно на стороне сервера, и равняется ***5***.
Переход по страницам производится с помощью query-параметра page:
``` /forum?page=2```

Возвращает: 
```
{
	"topicList":  [], //type: Array, Массив топиков
	"paginationOptions":  {
		"total":  0, // type: Number, количество записей в базе данных
		"perPage":  0, // type: Number, количество записей на странице
		"page":  1 // type: Number, текущая страница
	}
}
```

### POST /forum
Создать топик.
Проверка на авторизацию, credetials - true/include.
На локальном сервера требуется кука auth: true, в проде на домене .ya-praktikum.tech требуются куки authCookie и uuid

Принимает:
```
{
    "title": "" // type: String, название топика, rules: min=3, max=30, required
    "description": "" //type: String, описание топика, rules: min=20, max=500, required
}
```

Возвращает:
```
{
    "id": 0, // type: Number, Id топика
    "title": "",  // type: String, название топика
    "description": ""  //type: String, описание топика,
    "creator": "", //type: String, имя пользователя создавшего топик
    "creatorId": 0, //type: Number, Id пользователя создавшего топик 
    "comments": 0, //type: Number, кол-во комментариев в топике
    "updatedAt": "", //type: String, дата обновления
    "createdAt": "", //type: String, дата создания
}
```

### GET forum/:id
Топик со списком комментариев
Параметр id - идентификатор сущестующего топика

Возвращает:
```
{
    "id": 0, // type: Number, Id топика
    "title": "",  // type: String, название топика
    "description": ""  //type: String, описание топика,
    "creator": "", //type: String, имя пользователя создавшего топик
    "creatorId": 0, //type: Number, Id пользователя создавшего топик 
    "comments": 0, //type: Number, кол-во комментариев в топике
    "updatedAt": "", //type: String, дата обновления
    "createdAt": "", //type: String, дата создания
    "commentsList": [], //type: Array, список коментариев
}
```

### PATCH forum/:id
Добавляет комментарий к топику
Проверка на авторизацию, credetials - true/include.
На локальном сервера требуется кука auth: true, в проде на домене .ya-praktikum.tech требуются куки authCookie и uuid

Принемает: 
```
{
    "message": "" // type: String, текст комментария, rules: min=20, max=500, required
}
```

Возвращает:
```
{
    "id": 0, //type: Number, идентификатор комментария
    "message": "", //type: String, текст комментария
    "creator": "", //type: String, имя пользователя добавившего комментарий 
    "creatorId": 0, //type: Number, идентификатор пользователя добавившего комментарий 
    "topicId": 0, //type: Number, идентификатор топика, с которым ассоциируется комментарий
    "updatedAt": "", //type: String, дата обновления
    "createdAt": "", //type: String, дата создания
}
```
