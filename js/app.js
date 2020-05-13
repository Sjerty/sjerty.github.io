$(function(){

    let filter = $("[data-filter]");
    
    filter.on("click", function(event) {
        event.preventDefault();
         
        let cat = $(this).data('filter');
        if(cat == 'all'){
            $("[data-cat]").removeClass("hide");
        } else {

            $("[data-cat]").each(function(){
                
                let workCat = $(this).data('cat');

                if(workCat != cat){
                    $(this).addClass('hide');
                } else{
                    $(this).removeClass('hide');
                }

            });
        }
    });
    
   /*Modal*/ 
    
    const modal_call = $("[data-modal]");
    const modal_close = $("[data-close]");
    
    modal_call.on("click", function(event){
        event.preventDefault();
        
        let $this = $(this);
        let modalId = $this.data('modal');
        
        $(modalId).addClass('show');
        $('body').addClass('no-scroll');
        
        setTimeout(function(){
            $(modalId).find(".modal__dialog").css({
                transform: "rotateX(0)"
            })
        },200);
    });
    
    modal_close.on("click", function(event){
        event.preventDefault();
        
        let $this = $(this);
        let modalPar = $this.parents('.modal');
        
        modalPar.removeClass('show');
        $('body').removeClass('no-scroll');
    });
    
    $(".modal").on("click", function(event){
        $(this).removeClass('show');
        $('body').removeClass('no-scroll');
    });
    
    $(".modal__dialog").on("click", function(event){
        event.stopPropagation();
    });
    
    /*Mobile-Nav*/
    
    const navToggle = $("#navToggle");
    const nav = $("#nav");
    let navlink = $("[data-link]");
    
    navToggle.on("click", function(event)  {
        event.preventDefault();
    
        nav.toggleClass("show");
    });
    
    navlink.on("click", function(event){
        
        nav.toggleClass("show");
    });

});