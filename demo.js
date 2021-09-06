$(document).ready(function () {
  // alert('abc');
  var url = "ajax/ajaxCard";
  var ajaxobj = new AjaxObject(url, 'json');
  console.log(ajaxobj);
  ajaxobj.getall();

  // 搜尋按鈕
  var exampleModal = document.getElementById('addbtn')
  exampleModal.addEventListener('show.bs.modal', function (event) {
  // Button that triggered the modal
  var button = event.relatedTarget
  // Extract info from data-bs-* attributes
  var recipient = button.getAttribute('data-bs-whatever')
  // If necessary, you could initiate an AJAX request here
  // and then do the updating in a callback.
  //
  // Update the modal's content.
  var modalTitle = exampleModal.querySelector('.modal-title')
  var modalBodyInput = exampleModal.querySelector('.modal-body input')

  modalTitle.textContent = 'New message to ' + recipient
  modalBodyInput.value = recipient
  })

  // 自適應視窗
  $(window).resize(function () {
      var wWidth = $(window).width();
      var dWidth = wWidth * 0.4;
      var wHeight = $(window).height();
      var dHeight = wHeight * 0.4;
      $("#dialog-confirm").dialog("option", "width", dWidth);
      $("#dialog-confirm").dialog("option", "height", dHeight);
  });
});

function conversePhone(n) {
  let ary = n.split('');
  ary.splice(4, 0, '-');
  ary.splice(8, 0, '-');
  let result = ary.join('');
  return result;
}

function refreshTable(data) {
  // var HTML = '';
  $("#cardtable tbody > tr").remove();
  $.each(data, function (key, item) {
      var strsex = '';
      if (item.sex == 0)
          strsex = '男';
      else
          strsex = '女';
      let tooltipString = `[${strsex}]${item.cnname}(${item.enname})`
      let popoverString = `聯絡方式 ： ${conversePhone(item.phone)}`
      console.log(popoverString);
      var row = $("<tr></tr>");
      row.append($(`<td data-original-title="111" data-toggle="tooltip" data-placement="bottom" class="matrisHeader" data-container="body" title="${tooltipString}"></td>`).html(item.cnname));
      row.append($("<td></td>").html(item.enname));
      row.append($("<td></td>").html(strsex));
      row.append($(`<td data-bs-container="body" data-bs-toggle="popover" data-bs-placement="right" data-bs-content="${popoverString}"></td>`).html(item.phone));
      row.append($("<td></td>").html(item.email));
      row.append($("<td></td>").html('<button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modify" data-bs-whatever="@mdo">修改</button>'));
      row.append($("<td></td>").html('<button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete" data-bs-whatever="@mdo">刪除</button>'));
      $("#cardtable").append(row);
      var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
      var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
      })
      console.log(popoverList);
      $("[data-toggle='tooltip']").tooltip();
  });
}

function initEdit(response) {
var modifyid = $("#cardtable").attr('id').substring(12);
$("#mocnname").val(response[0].cnname);
$("#moenname").val(response[0].enname);
if (response[0].sex == 0) {
    $("#modifyman").prop("checked", true);
    $("#modifywoman").prop("checked", false);
}
else {
    $("#modifyman").prop("checked", false);
    $("#modifywoman").prop("checked", true);
}
$("#modifysid").val(modifyid);
$("#dialog-modifyconfirm").dialog({
    resizable: true,
    height: $(window).height() * 0.4,// dialog視窗度
    width: $(window).width() * 0.4,
    modal: true,
    buttons: {
        // 自訂button名稱
        "修改": function (e) {
            // $("#modifyform").submit();
            var url = "ajax/ajaxCard";
            var cnname = $("#mocnname").val();
            var enname = $("#moenname").val();
            var sex = $('input:radio:checked[name="mosex"]').val();
            var ajaxobj = new AjaxObject(url, 'json');
            ajaxobj.cnname = cnname;
            ajaxobj.enname = enname;
            ajaxobj.sex = sex;
            ajaxobj.id = modifyid;
            ajaxobj.modify();

            e.preventDefault(); // avoid to execute the actual submit of the form.
        },
        "重新填寫": function () {
            $("#modifyform")[0].reset();
        },
        "取消": function () {
            $(this).dialog("close");
        }
    },
    error: function (exception) { alert('Exeption:' + exception); }
});
}

/**
* 
* @param string
*          url 呼叫controller的url
* @param string
*          datatype 資料傳回格式
* @uses refreshTable 利用ajax傳回資料更新Table
*/
function AjaxObject(url, datatype) {
  this.url = url;
  console.log(this.url);
  this.datatype = datatype;
  console.dir(this.datatype);
}
AjaxObject.prototype.cnname = '';
AjaxObject.prototype.enname= '';
AjaxObject.prototype.sex = '';
AjaxObject.prototype.phone = '';
AjaxObject.prototype.email = '';
AjaxObject.prototype.id = 0;
AjaxObject.prototype.alertt = function () {
  alert("Alert:");
}
AjaxObject.prototype.getall = function () {
response = '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0","phone":"0938337898","email":"abc@gmail.com"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0","phone":"0918301738","email":"cdn@gmail.com"},{"s_sn":"50","cnname":"趙雪瑜","enname":"Sharon","sex":"0","phone":"0921387390","email":"btn@gmail.com"},{"s_sn":"51","cnname":"賴佳蓉","enname":"Yoki","sex":"1","phone":"0932357198","email":"mdn@gmail.com"}]';
refreshTable(JSON.parse(response));
}
AjaxObject.prototype.add = function () {
response = '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0","phone":"0938337898","email":"abc@gmail.com"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0","phone":"0918301738","email":"cdn@gmail.com"},{"s_sn":"50","cnname":"趙雪瑜","enname":"Sharon","sex":"0","phone":"0921387390","email":"btn@gmail.com"},{"s_sn":"51","cnname":"賴佳蓉","enname":"Yoki","sex":"1","phone":"0932357198","email":"mdn@gmail.com"},{"s_sn":"52","cnname":"新增帳號","enname":"NewAccount","sex":"1"}]';
refreshTable(JSON.parse(response));
$("#dialog-addconfirm").dialog("close");
}
AjaxObject.prototype.modify = function () {
response = '[{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0"}]';
refreshTable(JSON.parse(response));
$("#dialog-modifyconfirm").dialog("close");
}
AjaxObject.prototype.modify_get = function () {
response = '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0"},{"s_sn":"50","cnname":"趙雪瑜","enname":"Sharon","sex":"0"},{"s_sn":"51","cnname":"賴佳蓉","enname":"Yoki","sex":"1"}]';
initEdit(JSON.parse(response));
}
AjaxObject.prototype.search = function () {
response = '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0"}]';
refreshTable(JSON.parse(response));
$("#dialog-searchconfirm").dialog("close");
}
AjaxObject.prototype.delete = function () {
response = '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0"}]';
refreshTable(JSON.parse(response));
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()