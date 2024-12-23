import { auth } from './app/firebase.js';
import {onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js"
import {loginCheck} from './app/loginCheck.js';

import './app/firebase.js';
import './app/singupFrom.js';
import './app/logout.js';
import './app/singinForm.js'
import './app/googlelogin.js'
import './app/facebooklogin.js'


onAuthStateChanged(auth, async(user) =>{
    console.log(user)

    if (user )// si existe el susuairo 
    {
        loginCheck(user)

    }else {
        loginCheck(user)
    }
})





