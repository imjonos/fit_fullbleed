# fit_fullbleed
jQuery Images Fit Fullbleed plugin

Плагин изменяет размер изображения, подстраивая его под контейнер.

Ждет загрузки изображения.
Реагирует на изиенение размера окна и пересчитывает размер изображения.


Пример использования:

        <div id="container1" style="width:800px;height:600px;">
            <img id="imgTest" src="http://environmentalgeography.files.wordpress.com/2010/02/nature_by_abhishekultimatum.jpg?q=45465d151556g12">
        </div>
        <br><br>
        <div id="container2" style="width:800px;height:600px;overflow: hidden;">
            <img id="imgTestFit" src="http://environmentalgeography.files.wordpress.com/2010/02/nature_by_abhishekultimatum.jpg?q=45465d151556g12">
        </div>
            
        <script>
            $("#imgTest").resizeImage("fullbleed");
            $("#imgTestFit").resizeImage("fit");
        </script>

------------------------------------------------------------
2017-01-18 
Добавленны callbacks
------------------------------------------------------------
<script>
	var params = {
                     'beforeResize': function (image) {
   
                      },
                      'onComplete': function (image) {
   
                      }
                  };
    $("#imgTest").resizeImage(params); 
	$("#imgTest").resizeImage("fullbleed");
    $("#imgTestFit").resizeImage(params);
    $("#imgTestFit").resizeImage("fit");     

</script>

