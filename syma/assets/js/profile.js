/**
 * Created by yangwei on 16/8/15.
 */

/**
 * Created by yangwei on 10/6/15.
 */
$(function () {
    //Initialize Select2 Elements
    $(".select2").select2({
        minimumResultsForSearch: Infinity
    });

});

$("[id$='Date']").datepicker({
    format: 'yyyy年mm月dd日',
    autoclose: true,
    todayHighlight: true
});

//$('#HiredDate').datepicker({
//    format: 'yyyy年mm月dd日',
//    autoclose: true,
//    todayHighlight: true
//});

$('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
    checkboxClass: 'icheckbox_flat-green',
    radioClass: 'iradio_flat-green'
});
