$(document).ready(function(){

    function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }


    $('.form').submit(function(e){

        submitt = true;

        nameinput = $('input[name=name]').val();
        emailinput = $('input[name=email]').val();
        passwordinput = $('input[name=password]').val();

        if(nameinput.length < 3) {
            submitt = false;
            alert('Please type your real name');
        } else if(validateEmail(emailinput) == false) {
            submitt = false;
            alert('Please type your real email');
        } else if (passwordinput.length < 3) {
            submitt = false;
            alert('Please select a stronger password');
        }

        if(submitt == true) {

        

            var serializedData = $('.form').serialize();

            $('.form').hide();
            $('.loading').fadeIn();

            request = $.ajax({
                url: "/auth/signup",
                type: "post",
                data: serializedData
            });

            
        
            // Callback handler that will be called on success
            request.done(function (response, textStatus, jqXHR){

                console.log(response);

                if(response == 0) {
                    console.log('0');
                    alert('Account with this email address already exist.');
                    $('.loading').hide();
                    $('.form').fadeIn();
                    
                } else {
                    setTimeout(function(){
                        $('body').fadeOut();
                        setTimeout(function(){
                            window.location.replace("/verification/");
                        },2000);
                        
                    },2000);
                }
                
                /*
                
                */
            });
        
            // Callback handler that will be called on failure
            request.fail(function (jqXHR, textStatus, errorThrown){
                // Log the error to the console
                console.error(
                    "The following error occurred: "+
                    textStatus, errorThrown
                );
            });

        }

        /*setTimeout(function(){
            $('body').fadeOut();
            setTimeout(function(){
                window.location.replace("/exchange");
            },1000);
        },2000);*/

        


        e.preventDefault();
    });

    $('.bank_form').submit(function(e){

        var serializedData = $('.bank_form').serialize();


        $('.bank_form').hide();
        $('.loading').fadeIn();


        request = $.ajax({
            url: "/verification/save",
            type: "post",
            data: serializedData
        });

        //$('body').fadeOut();
    
        // Callback handler that will be called on success
        request.done(function (response, textStatus, jqXHR){
            console.log('ok');
            $("html, body").animate({ scrollTop: 0 }, "slow");
            /*setTimeout(function(){
                window.location.replace("/verification/");
            },1000);*/
        });
    
        // Callback handler that will be called on failure
        request.fail(function (jqXHR, textStatus, errorThrown){
            // Log the error to the console
            console.error(
                "The following error occurred: "+
                textStatus, errorThrown
            );
        });


        
        setTimeout(function(){
            $('.loading').hide();
            $('.step-one').hide();
            $('.step-two').show();
            /*$('.steps p').hide();
            $('.loading').replaceWith('<div class="green">Your exchange request was successfully created.<br/>We will review and approve it in 24 hours.</div>')
            */
        },2000);

        


        e.preventDefault();
    });

    $('.block_4 button').click(function(){
        $('html, body').animate({scrollTop: '0px'}, 300);
    });


    $('#upload').on('click', function() {
        var file_data = $('#sortpicture').prop('files')[0];
        var form_data = new FormData();
        form_data.append('file', file_data);

        $('.step-two div').hide();
        $('.step-two .loading').show();
        
        $.ajax({
                    url: '/verification/upload',
                    dataType: 'text',
                    headers: { "cache-control": "no-cache" },
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: form_data,
                    type: 'post',
                    success: function(php_script_response){
                        console.log('success');
                        $('.step-two .loading').hide();
                        $('.step-two p').replaceWith('<div style="font-size: 30px;">Information was submitted successfully.<br/>You will hear back from us in 1 business day.</div>');
                    }
         });
    });


    $('#sortpicture').change(function(ev) {

        $('.upload-group').fadeIn();
    });



    setTimeout(function(){
        //$('.lo1').hide();
        $('.lo2').animate({opacity: 1}, 1000);
    },1500);


    setTimeout(function(){
        $('.loading-overlay').fadeOut('fast');
    },4000);


    $('.ssn').on('keypress', function(event){
        // trap keypress
        var character = String.fromCharCode(event.which);
        if(!isInteger(character)){
            return false;
        }    
    });
    
    // checks that an input string is an integer, with an optional +/- sign character
    function isInteger (s) {
        if(s === '-') return true;
       var isInteger_re     = /^\s*(\+|-)?\d+\s*$/;
       return String(s).search (isInteger_re) != -1
    }
    
    // format SSN 
    $('.ssn').on('keyup', function(){
       var val = this.value.replace(/\D/g, '');
       var newVal = '';
        if(val.length > 4) {
            this.value = val;
        }
        if((val.length > 3) && (val.length < 6)) {
            newVal += val.substr(0, 3) + '-';
            val = val.substr(3);
        }
        if (val.length > 5) {
            newVal += val.substr(0, 3) + '-';
            newVal += val.substr(3, 2) + '-';
            val = val.substr(5);
        }
        newVal += val;
        this.value = newVal;   
    });
    

    $(function(){
        $(".onlynumbers").on('input', function (e) {
          $(this).val($(this).val().replace(/[^0-9]/g, ''));
        });
      });


    function mobileScroll(){
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        
            $('html, body').animate({
                scrollTop: $(".pi_right").offset().top
            }, 500);
        
        }
    }

    
    $('#pm_pblock1').click(function(e){
        $('.p_manage a').removeClass('active-menu');
        $(this).addClass("active-menu")
        $('.pblock2').hide();
        $('.pblock3').hide();
        $('.pblock1').fadeIn();

        mobileScroll();

        e.preventDefault();
    });

    $('#pm_pblock2').click(function(e){
        $('.p_manage a').removeClass('active-menu');
        $(this).addClass("active-menu")
        $('.pblock1').hide();
        $('.pblock3').hide();
        $('.pblock2').fadeIn();

        mobileScroll();

        e.preventDefault();
    });

    $('#pm_pblock3').click(function(e){
        $('.p_manage a').removeClass('active-menu');
        $(this).addClass("active-menu")
        $('.pblock1').hide();
        $('.pblock2').hide();
        $('.pblock3').fadeIn();

        mobileScroll();

        e.preventDefault();
    });



    $('.pb2_add').click(function(){
        $('.pd2_addform').fadeIn('fast');
    });

    $('.submit_bankaddform').click(function(){
        an = $('input[name=an]').val();
        confirm_an = $('input[name=confirm_an]').val();
        rn =  $('input[name=rn]').val();
        console.log(rn);

        if(an != confirm_an) {
            alert('Account numbers do not match');
        } else {

            requestq = $.ajax({
                url: "/profile/banksave",
                type: "post",
                data: {'an': an, 'rn': rn}
            });

            $(".pdf2_inner").html('<div style="width:100%;text-align:center;margin-bottom:50px"><img src="/img/loading.gif" width="50px" /></div>');

            requestq.done(function (response, textStatus, jqXHR){
                setTimeout(function(){
                    $(".pdf2_inner").html('<div style="margin-bottom: 30px; font-size: 20px;">Two small deposits were sent to your bank account. The micro deposits usually arrive in 1-2 business days.</div>');
                },1000);
            });

        }



    });


    $('.action_confirm_account').click(function(){
        $(this).parent().parent().find('.confirmation-div').toggle();
    });

    


    $(".action-changeemail").click(function(){
        

        emailchange = $('input[name=change-email]').val();
        oldemail = $('input[name=change-email]').attr('olddata');
        if(oldemail == emailchange) {
            alert("Your current email is already "+oldemail);
            
            //return;
        } else{
            

            if(validateEmail(emailchange)){

                $(this).attr('disabled', 'disabled');
                $(this).css('opacity', '0.2');

                requestd = $.ajax({
                    url: "/profile/changeemail",
                    type: "post",
                    data: {'email': emailchange}
                });

                
    
                
    
                requestd.done(function (response, textStatus, jqXHR){
                    if(response == '1') {
                        $("html, body").animate({ scrollTop: 0 }, "fast");
                        $(".action-changeemail").parent().parent().html('Your email was changed successfully.')
                    } else {
                        alert('Request failed');
                    }
                    
                });
                
            } else {
                alert('This is not an email address');
            }

        }
    });


    $(".action-changepass").click(function(){
        oldpass = $('input[name=old-password]').val();
        newpass = $('input[name=new-password]').val();
        newpassconfirm = $('input[name=old-password-confirm]').val();

        
        if(newpass == newpassconfirm) {

            if(newpass.length < 5) {
                alert('Please use a stronger password');
            } else {

                $(this).attr('disabled', 'disabled');
                $(this).css('opacity', '0.2');


                requestx = $.ajax({
                    url: "/profile/changepassword",
                    type: "post",
                    data: {'oldpass': oldpass, 'newpass': newpass}
                });

                
    
                
    
                requestx.done(function (response, textStatus, jqXHR){
                    if(response == '1') {
                        $("html, body").animate({ scrollTop: 0 }, "fast");
                        $(".action-changepass").parent().parent().html('Your password was changed successfully.')
                    } else {
                        alert('Old password is incorrect.');
                        $(".action-changepass").prop("disabled", false);
                        $(".action-changepass").css('opacity', '1');
                    }
                    
                });


            }

        } else {
            alert('Passwords are not the same.')
        }

    });

    
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        
        $('html, body').animate({
            scrollTop: $(".pi_right").offset().top
        }, 500);
    
    }
    


});