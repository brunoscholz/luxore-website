angular.module('app').run(['gettextCatalog', function (gettextCatalog) {
/* jshint -W100 */
    gettextCatalog.setStrings('pt_BR', {"Active":"Ativo","All":"Tudo","Clear completed ({{completedCount}})":"Limpeza Concluída","Completed":"Concluído","Double-click to edit a todo":"Clique duas vezes para editar","Mark all as complete":"Marcar tudo como completo","What needs to be done?":"O que é preciso fazer?","{{$count}} item left":["{{$count}} item à esquerda","{{$count}} itens à esquerda"]});
/* jshint +W100 */
}]);