$(document).ready(function(){

    var lightboxContainer = $(".lightbox-container");
    var lightboxPhoto = $(".lightbox-photo");
    var self;

    $(".picture").click(function(e){
        if(!self){
            self = $(this);
            lightboxPhoto.attr("src", self.attr("src"));
            lightboxContainer.fadeIn(); // even though it's async, this sets display:block
            self.animate({"opacity": 0}); //doesn't set display:none

            $(document).one("click", function(){
                lightboxContainer.fadeOut();
                self.animate({"opacity": 1});
                self = null;
            });

            return false;
        }else{
            return true;
        }
    });


});