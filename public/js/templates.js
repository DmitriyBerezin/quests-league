function tmplAlert(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (className, msg) {
buf.push("<div" + (jade.cls(['alert-comment-error','alert',className], [null,null,true])) + ">" + (jade.escape(null == (jade_interp = msg) ? "" : jade_interp)) + "<button type=\"button\" data-dismiss=\"alert\" aria-label=\"Close\" class=\"close\"><span aria-hidden=\"true\">&times;</span></button></div>");}.call(this,"className" in locals_for_with?locals_for_with.className:typeof className!=="undefined"?className:undefined,"msg" in locals_for_with?locals_for_with.msg:typeof msg!=="undefined"?msg:undefined));;return buf.join("");
}
function tmplComment(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (comment) {
jade_mixins["commentWidget"] = function(comment){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<article class=\"media comment\"><div class=\"media-body\"><h4 class=\"media-heading\">" + (jade.escape((jade_interp = comment.user_name) == null ? '' : jade_interp)) + "<span class=\"small text-muted\">" + (jade.escape(null == (jade_interp = comment.date) ? "" : jade_interp)) + "</span></h4><p class=\"comment-text\">" + (jade.escape(null == (jade_interp = comment.comment) ? "" : jade_interp)) + "</p></div></article>");
};





jade_mixins["commentWidget"](comment);}.call(this,"comment" in locals_for_with?locals_for_with.comment:typeof comment!=="undefined"?comment:undefined));;return buf.join("");
}
function tmplEditableComment(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (comment) {
jade_mixins["commentWidget"] = function(comment){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<article class=\"media comment\"><div class=\"media-body\"><h4 class=\"media-heading\">" + (jade.escape((jade_interp = comment.user_name) == null ? '' : jade_interp)) + "<span class=\"small text-muted\">" + (jade.escape(null == (jade_interp = comment.date) ? "" : jade_interp)) + "</span></h4><p class=\"comment-text\">" + (jade.escape(null == (jade_interp = comment.comment) ? "" : jade_interp)) + "</p></div></article>");
};
jade_mixins["editableCommentWidget"] = function(comment){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<b>Ваш отзыв</b><span" + (jade.attr("data-comment-id", comment.id, true, false)) + " class=\"user-comment-remove pseudo-link\">Удалить</span><span" + (jade.attr("data-comment-id", comment.id, true, false)) + " class=\"user-comment-edit pseudo-link\">Изменить</span>");
jade_mixins["commentWidget"](comment);
};
jade_mixins["editableCommentWidget"](comment);}.call(this,"comment" in locals_for_with?locals_for_with.comment:typeof comment!=="undefined"?comment:undefined));;return buf.join("");
}
function tmplQuestsList(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (quests, undefined) {
jade_mixins["questWidget"] = function(quest){
var block = (this && this.block), attributes = (this && this.attributes) || {};
buf.push("<a" + (jade.attr("href", '/quest/' + (quest.id) + '', true, false)) + "><div class=\"event-list-item\"><img" + (jade.attr("src", quest.img.url, true, false)) + " alt=\"\"/><div class=\"row\"><div class=\"col-md-12\"><h3 class=\"no-margin-top\">" + (jade.escape(null == (jade_interp = quest.name) ? "" : jade_interp)) + "</h3></div></div><div class=\"row\"><div class=\"col-md-12\">");
if ( quest.price_from && quest.price_to)
{
buf.push("<span class=\"event-price\">от <b>" + (jade.escape(null == (jade_interp = quest.price_from) ? "" : jade_interp)) + "</b> до <b>" + (jade.escape(null == (jade_interp = quest.price_to) ? "" : jade_interp)) + "</b></span>");
}
if ( quest.players_from && quest.players_to)
{
buf.push("<span class=\"event-persons\"><i class=\"fa fa-user\"></i> " + (jade.escape((jade_interp = quest.players_from) == null ? '' : jade_interp)) + "-" + (jade.escape((jade_interp = quest.players_to) == null ? '' : jade_interp)) + " людей</span>");
}
buf.push("</div></div><div class=\"row\"><div class=\"col-md-12 event-info-block\"><hr/><ul class=\"list-unstyled\">");
if ( quest.stations)
{
buf.push("<li class=\"list-item-subway\"><span>" + (jade.escape(null == (jade_interp = quest.stations) ? "" : jade_interp)) + "</span></li>");
}
if ( quest.address)
{
buf.push("<li class=\"list-item-marker\"><span>" + (jade.escape(null == (jade_interp = quest.address) ? "" : jade_interp)) + "</span></li>");
}
buf.push("</ul><button class=\"btn btn-success\">забронировать</button></div></div></div></a>");
};
if ( quests && quests.length > 0)
{
buf.push("<div class=\"row\">");
// iterate quests
;(function(){
  var $$obj = quests;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var quest = $$obj[$index];

buf.push("<div class=\"col-md-4 col-sm-6 col-sx-12\">");
jade_mixins["questWidget"](quest);
buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var quest = $$obj[$index];

buf.push("<div class=\"col-md-4 col-sm-6 col-sx-12\">");
jade_mixins["questWidget"](quest);
buf.push("</div>");
    }

  }
}).call(this);

buf.push("</div>");
}
else
{
buf.push("<h4>По Вашему запросу ничего не найдено</h4>");
}}.call(this,"quests" in locals_for_with?locals_for_with.quests:typeof quests!=="undefined"?quests:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
}