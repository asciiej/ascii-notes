<h3 align="center"><strong>ASCII Notes</strong></h3>
<p align="center">ToDo List</p>

<p>Simulemos que em uma reunião com um cliente foram acordados os requisitos a serem implementados para o software encomendado pelo mesmo</p>
<br/>

<h3><strong>Requisitos Funcionais</strong></h3>
<p>Quais as necessidades que o software deverá sanar? O que o cliente espera do software?</p>

- <details>
  <summary>Necessário software para gerenciar tarefas a serem feitas</summary>
  É necessário que o software gerencie minhas tarefas do dia a dia, permitindo que eu adicione novas tarefas, atualize a descrição ou título ou a data máxima de conclusão de uma tarefa existente, mude o estado da tarefa entre "a fazer", "fazendo" e "concluido", além disso deve permitir que eu exclua uma tarefa, e também preciso que sejam mostradas em um quadro estilo kanban.
  Quando a tarefa é movida para o estado "concluido" deve se armazenar a data de conclusão.
  As regras de mudanças de estados são as seguintes, as tarefas somente poderão mudar de "a fazer" para "fazendo" e de "fazendo" para "concluido".
  Cada tarefa deve possuir título, descrição, data máxima de conclusão e ao concluir a tarefa deverá armazenar a data 
  </details>


<br/>
<h3><strong>Requisitos Não-Funcionais</strong></h3>
<p>O que é necessário para resolver o problema do cliente? Quais tecnologias, banco de dados, algoritmos serão necessários?</p>

- <details>
  <summary>Identificado a necessidade das seguintes tecnologias</summary>
  
  - <strong>mongodb</strong> · utilizaremos um banco de dados não relacional pois o software não possuirá relacionamentos, tendo em vista que existirá apenas uma tabela, mas caso futuramente ele evolua para mais tabelas o mongodb também permite relacionamentos.
  - <strong>nodejs</strong> · utilizaremos o nodejs como tecnologia base de desenvolvimento visando o atual dominio da mesma por parte dos membros da empresa e a facilidade que ela proporciona no desenvolvimento.
  - <strong>reactjs</strong> · utilizaremos a biblioteca com mais confiabilidade do mercado no quesito de criação de interfaces, pois a mesma possui muitos recursos prontos que nos facilitarão na criação do quadro kanban.
  </details>

<br/>
<h3><strong>Regras de negócio</strong></h3>
<p>Qual será a nossa abordagem para resolver o problema do cliente? isto é, como combinaremos os requisitos funcionais com os não-funcionais?</p>

- <details>
  <summary>Regras de negócio</summary>
  
  - <strong>Criar nova tarefa</strong> · o sistema deverá possuir um botão "Adicionar tarefa" que abrirá um modal com o formulário a ser preenchido pelo usuário. O sistema deve armazenar a tarefa no banco de dados e avisar o usuário quando o processo terminar.
  - <strong>Atualizar tarefa</strong> · o sistema deverá possuir um botão "Atualizar tarefa" no card da tarefa que abrirá um modal com o formulário a ser preenchido pelo usuário. O sistema deve armazenar a atualização da tarefa no banco de dados e avisar o usuário quando o processo terminar.
  - <strong>Mover tarefa</strong> · o sistema deverá possuir um botão "Mover tarefa" no card da tarefa (desabilitado no estado "concluído") que deverá atualizar a tarefa para o estado seguinte, isto é, se estiver no estado "a fazer" deverá atualiza-la para "fazendo", se estiver no estado "fazendo" deverá atualiza-la para "concluido". O sistema deve armazenar a atualização da tarefa no banco de dados com a data atual e atualizar o quadro kanban com a mudança executada assim que o processo terminar.
  - <strong>Remover tarefa</strong> · o sistema deverá possuir um botão "Remover tarefa" no card da tarefa que deverá remover a tarefa apagando o registro da mesma no banco de dados, informando o usuário assim que o processo terminar.
  - <strong>Listar tarefas</strong> · o sistema deverá retornar todas as tarefas do usuário filtradas por estado e exibi-las em um quadro kanban.
  
  </details>

<br/>
<h3><strong>Modelagem do banco de dados</strong></h3>
<p>Como o banco de dados será estruturado para atender os requisitos do sistema</p>

- <details>
  <summary>Tabela Tasks</summary>
   
   - id: string required
   - title: string required
   - description: string required
   - targetDate: datetime required
   - createdAt: datetime default now
   - updatedAt: datetime default now
  </details>