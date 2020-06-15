$(function(){/*Когда документ готов запустить функцию*/

    /*Filter*/
    let filter = $("[data-filter]");/*Элементы с дата-атрибутом filter сохраняются в переменную*/
    
    filter.on("click", function(event) {/*При клике на элементы с data-filter будет вызываться функция*/
        event.preventDefault(); /*Предотвращение стандартного поведения ссылок*/
         
        let cat = $(this).data('filter');/*Сохранение значения data-filter*/
        if(cat == 'all'){
            $("[data-cat]").removeClass("hide");/*Если фильтр = "all", то у всех блоков убирается класс hide*/
        } else {

            $("[data-cat]").each(function(){/*Перебор каждого элемента с присвоенной категорией*/
                
                let workCat = $(this).data('cat');/*Сохранение элементов с категорией в переменную*/

                if(workCat != cat){
                    $(this).addClass('hide');/*Если категория не равна фильтру, то добавить класс hide*/
                } else{
                    $(this).removeClass('hide');/*Иначе убрать*/
                }
            });
        }
    });
    
   /*Modal*/ 
    const modal_call = $("[data-modal]"); /*Поиск элементов с дата-атрибутом modal*/
    const modal_close = $("[data-close]");/*Поиск элементов с дата-атрибутом close*/
    const modal_window = $("#modal_window");/*Поиск элемента с id = modal_window*/
    const modal_resume = $("#modal_resume");
    
    function reset_modal(){ /*Функция сброса модального окна*/
        $(modal_window).find(".modal__dialog").css({
            transform: "rotateX(90deg)"/*функция трансформации для плавного появления*/
        })
        $(modal_resume).find(".modal__dialog").css({
            transform: "rotateX(90deg)"/*функция трансформации для плавного появления*/
        })
    }
    
    modal_call.on("click", function(event){/*При клике на элементы с modal будет вызываться функция*/
        event.preventDefault(); /*Предотвращение стандартного поведения ссылок*/
        
        let $this = $(this);/*Сохранения данного элемента в переменную для удобства*/
        let modalId = $this.data('modal');/*Сохранение необходимого id модального окна для вызова*/
        
        if (modalId == "resume"){
            
            modal_resume.addClass('show');/*Показать модальное окно*/
            $('body').addClass('no-scroll');/*Блок прокрутки веб-страницы*/
            
            setTimeout(function(){/*Задержка вызова функции*/
                $(modal_resume).find(".modal__dialog").css({
                    transform: "rotateX(0)"/*функция трансформации для плавного появления*/
                    })
                },200);
        }
        else{
            $.getJSON('js/worksJS.json',function(jsResults){/*Ассинхронный запрос к файлу с данными*/
                /*Заполнение модального окна*/
                $(modal_window).find(".modal-work__image").attr("src",jsResults[modalId].img);
                $(modal_window).find(".modal-work__title").html(jsResults[modalId].title);
                $(modal_window).find(".modal-work__cat").html(jsResults[modalId].cat + "<br>" +jsResults[modalId].date);
                $(modal_window).find(".modal-work__company").html(jsResults[modalId].client);
                $(modal_window).find(".modal-work__desc").html(jsResults[modalId].text);
            });
            
            modal_window.addClass('show');/*Показать модальное окно*/
            $('body').addClass('no-scroll');/*Блок прокрутки веб-страницы*/
            
            setTimeout(function(){/*Задержка вызова функции*/
                $(modal_window).find(".modal__dialog").css({
                    transform: "rotateX(0)"/*функция трансформации для плавного появления*/
                    })
                },200);
            }
    });
    
    modal_close.on("click", function(event){/*При клике на кнопку закрытия модального окна вызывается функция*/
        event.preventDefault();/*Предотвращение стандартного поведения кнопки*/
        
        let $this = $(this);/*Сохранения данного элемента в переменную для удобства*/
        let modalPar = $this.parents('.modal');/*Поиск "родителя" данной кнопки у которого класс .modal и сохранение его в переменную*/
        
        modalPar.removeClass('show');/*Скрытие модального окна*/
        $('body').removeClass('no-scroll');/*Снятие запрета на прокрутку страницы*/
        
        reset_modal();/*Сброс поворота модального окна*/
        
    });
    
    $(".modal").on("click", function(event){/*При клике за границей модального окна вызывается функция*/
        $(this).removeClass('show');/*Скрытие модального окна*/
        $('body').removeClass('no-scroll');/*Снятие запрета на прокрутку страницы*/
        
        reset_modal();/*Сброс поворота модального окна*/
    });
    
    $(".modal__dialog").on("click", function(event){/*При клике на модальном окне вызывается функция*/
        event.stopPropagation();/* Отмена поведения родителя(простое объяснение), или же предотвращение дальнейшей передачи события вверх по иерархии DOM :> */
    });
    
    /*Mobile-Nav*/ /*Мобильная навигация*/
    
    const navToggle = $("#navToggle");/*Сохранение в переменную элемента с id = "navToggle" */
    const nav = $("#nav");/*Сохранение в переменную элемента с id = "nav" */
    let navlink = $("[data-link]");/*Сохранение в переменную элементов с дата-атрибутом link */
    
    navToggle.on("click", function(event)  {/*При клике на "бургер"(сложенное меню на смартфоне) вызывается функция*/
        event.preventDefault();/*Предотвращение стандартного поведения кнопки*/
    
        nav.toggleClass("show");/*Переключение класса "show"(показать выпадающее меню)*/
    });
    
    navlink.on("click", function(event){/*При клике на ссылку в выпадающем меню вызывается функция*/
        
        nav.toggleClass("show");/*Переключение класса "show"(скрыть выпадающее меню)*/
    });

});