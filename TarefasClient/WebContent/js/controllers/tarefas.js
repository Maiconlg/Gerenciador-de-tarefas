var app = angular.module('myApp', []);
app.controller('tarefasCtrl', function ($scope, $http) {


	var carregaTarefasAtrasadas = function () {
		$http.get("http://localhost:8080/tarefas/atrasadas")
			.then(function (response) {
				$scope.tarefasAtrasadas = response.data;
			});       
	};
    var carregaTarefasUrgente = function () {
        $http.get("http://localhost:8080/tarefas/urgente")
            .then(function (response) {
                $scope.tarefasUrgente = response.data;
            });       
    };
    var carregaTarefasAlta = function () {
        $http.get("http://localhost:8080/tarefas/alta")
            .then(function (response) {
                $scope.tarefasAlta = response.data;
            });
    };
    var carregaTarefasMedia = function () {
        $http.get("http://localhost:8080/tarefas/media")
            .then(function (response) {
                $scope.tarefasMedia = response.data;
            });
    };
    var carregaTarefasBaixa = function () {
        $http.get("http://localhost:8080/tarefas/baixa")
            .then(function (response) {
                $scope.tarefasBaixa = response.data;
            });
    };      
    carregaTarefasAtrasadas()
    carregaTarefasUrgente();
    carregaTarefasAlta();
    carregaTarefasMedia();
    carregaTarefasBaixa();
    
    $scope.salvaTarefa = function () {
        var dados = {
            descricao: $scope.descricao,
            deadline: $scope.deadline,
            severidade: $scope.severidade,
            realizada: false
        };
    $http.post("http://localhost:8080/tarefas",JSON.stringify(dados))
            .then(
            function (sucesso) {
                $scope.sucesso = 'Tarefa salva!';
                carregaTarefasAtrasadas()
                carregaTarefasUrgente();
                carregaTarefasAlta();
                carregaTarefasMedia();
                carregaTarefasBaixa();
                $scope.descricao = null;
                $scope.deadline = null;
                $scope.severidade = null;
            },
            function (erro) {
                $scope.erro = 'Ocorreu um erro ao tentar salvar a tarefa!';
            }
            );

    };
    
    $scope.atualizaTarefa = function () {
        var dados = {
        	id: $scope.id,	
            descricao: $scope.descricao,
            deadline: $scope.deadline,
            severidade: $scope.severidade,
            realizada: false
        };
    $http.put("http://localhost:8080/tarefas",JSON.stringify(dados))
            .then(
            function (sucesso) {
                $scope.sucesso = 'Tarefa atualizada';
                carregaTarefasAtrasadas()
                carregaTarefasUrgente();
                carregaTarefasAlta();
                carregaTarefasMedia();
                carregaTarefasBaixa();
                $scope.descricao = null;
                $scope.deadline = null;
                $scope.severidade = null;
            },
            function (erro) {
                $scope.erro = 'Ocorreu um erro ao tentar atualizar a tarefa!';
            }
            );

    };


    $scope.removeTarefa = function (idTarefa) {
        $http.delete("http://localhost:8080/tarefas/"+idTarefa)
            .then(
            function (sucesso) {
                $scope.sucesso = 'Tarefa removido';
                carregaTarefasAtrasadas()
                carregaTarefasUrgente();
                carregaTarefasAlta();
                carregaTarefasMedia();
                carregaTarefasBaixa();
            },
            function (erro) {
                $scope.erro = 'Ocorreu um erro ao tentar remover a tarefa';
            }
            );
    };
    $scope.finalizaTarefa = function (idTarefa,descricaoTarefa,deadlineTarefa,severidadeTarefa) {
        var dados = {
        	id:idTarefa,	
            descricao: descricaoTarefa,
            deadline: deadlineTarefa,
            severidade: severidadeTarefa,
            realizada: true
        };
    $http.put("http://localhost:8080/tarefas",JSON.stringify(dados))
            .then(
            function (sucesso) {
                $scope.sucesso = 'Tarefa finalizada!';
                carregaTarefasAtrasadas();
                carregaTarefasUrgente();
                carregaTarefasAlta();
                carregaTarefasMedia();
                carregaTarefasBaixa();
                $scope.descricao = null;
                $scope.deadline = null;
                $scope.severidade = null;
            },
            function (erro) {
                $scope.erro = 'Ocorreu um erro ao tentar finalizar a tarefa!';
            }
            );

    };
    
    $scope.carregaTarefa = function (idTarefa,descricaoTarefa,deadlineTarefa,severidadeTarefa) {
    	$scope.id = idTarefa;
    	$scope.descricao = descricaoTarefa;
        $scope.deadline = deadlineTarefa;
        $scope.severidade = severidadeTarefa;

    };
    
    
    
    function trocar(obj){
		if(obj.style.display == "none"){
			obj.style.display = "block";
		}else{
			obj.style.display = "none";
		}
	}
       
});
