/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
  var firebaseConfig = {
    apiKey: "AIzaSyB0PH_Nto6D_fAaJ2axTIoC0Q7egzDm8VA",
    authDomain: "situal-cave.firebaseapp.com",
    databaseURL: "https://situal-cave-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "situal-cave",
    storageBucket: "situal-cave.appspot.com",
    messagingSenderId: "456412005724",
    appId: "1:456412005724:web:09bf3739f6b5c889226d99",
    measurementId: "G-CSR1F49QJK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  var database = firebase.database();
  var storage = firebase.storage();
  var picture="";
  console.log(database);
  console.log(storage);
  document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    /*document.getElementById('deviceready').classList.add('ready');*/
    firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    ID=user.uid;
    admin_ability()
  } 
  else {
    // No user is signed in.
	auth_user();
  }
    
});

}
loginAccess=()=>
{
    var email=document.getElementById("Auth_email").value;
    var pass=document.getElementById("Auth_password").value;
  firebase.auth().signInWithEmailAndPassword(email,pass).then(function()
  { 
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    ID=user.uid;
    admin_ability();
  } 
  else {
    // No user is signed in.
	auth_user();
  }
    
});

  }).catch(function(error)
  {
    /* //////console.log("failled  "+error+" "+ email+"  ---"+pass); */
    alert(error.message);

  });
  
}
logoutAccess=()=>
{
  firebase.auth().signOut().then(function()
  {	
  	auth_user();

  }).catch(function(error)
  {
    alert(error.message);

  });

  
};

open_blogs=()=>
{
	document.getElementById('app').innerHTML='<div class="content_display" id="blogs_c">'+
                    
                    '</div><div class="content row_style"><button class="btn" onclick=admin_ability()>Back</button></div>';
    blog_reader();
}
open_events=()=>
{
	document.getElementById('app').innerHTML='<div class="content_display" id="events_c">'+
                    
                    '</div><div class="content row_style"><button class="btn" onclick=admin_ability()>Back</button></div>';
    event_reader();
}
CorB=(x)=>
{
    switch(x)
    {
        case "confirm_sec":
            document.getElementById('confirm_section').style.display="flex";
            document.getElementById('book_section').style.display="none";
            document.getElementById('card').innerHTML="";
            break;
        case "booking_sec":
            document.getElementById('confirm_section').style.display="none";
            document.getElementById('book_section').style.display="flex";
            event_Data();
            break;
        default :
            break;
    }
}
confirm_ticket=()=>
{
    document.getElementById('app').innerHTML='<div class="content">'+
                    '<label>Hi there! what would you like to do ?</label>'+
                    '<select style="height: 6vh;width:37vh" onchange=CorB(this.value)>'+
                        '<option value="confirm_sec">Confirm a ticket</option>'+
                        '<option value="booking_sec">Book a ticket</option>'+
                    '</select>'+
                '<div class="content" id="confirm_section">'+
                    '<label>Ticket ID</label>'+
                    '<input type="text" placeholder="-MhE9t6DkWRDxCbDBlaS" id="e_ticket">'+
                    '<button class="btn" id="e_update">Check</button>'+
                '</div>'+
                '<div class="content" id="book_section" style="display: none;">'+
                    '<label>Select Event</label>'+
                    '<select style="height: 6vh;width:37vh" id="event_list" onchange=event_Data_reader(this.value)>'+
                        
                    '</select>'+
                    '<div id="card">'+
                        
                    '</div>'+
                    '<label>Email</label>'+
                    '<input type="text" placeholder="johndoe@gamil.com" id="e_email">'+
                    '<label>Mobile Number</label>'+
                    '<input type="text" placeholder="+4470467783734" id="e_number">'+
                    '<div class="content row_style">'+
                        '<button class="btn" >Book now</button>'+
                        '<button class="btn" onclick=admin_ability()>Cancel</button>'+
                    '</div>'+
                '</div>'+
            '</div>';
}
add_event=()=>
{
	document.getElementById('app').innerHTML='<div class="content">'+
                '<h1 class="title">a new event</h1>'+
                '<div class="content row_style"><button class="btn" onclick=openFilePicker1() id="upload_btn">Upload Photo</button></div>'+
                '<label>Event Title</label>'+
                '<input type="text" placeholder="HackerFest2021" style="width: 60vw;" id="e_title">'+
                '<label>Location</label>'+
                '<input type="text" placeholder="Eg: Manchester" style="width: 60vw;" id="e_location">'+
                '<label>Price</label>'+
                '<input type="number" placeholder="100" id="e_price">'+
                '<label>Body</label>'+
                '<textarea placeholder="Content Description" style="width: 60vw;min-height:20vh;" id="e_description"></textarea>'+
                '<div class="content row_style"><button class="btn" onclick=upload_event() id="e_update">Update</button><button class="btn" onclick=admin_ability()>Cancel</button></div>'+
            '</div>';
/*            document.getElementById('e_update').style.display="none";
    		document.getElementById('e_description').style.display="none";
    		document.getElementById('e_title').style.display="none";
    		document.getElementById('e_price').style.display="none";
    		document.getElementById('e_location').style.display="none";
    		document.getElementById('e_update').style.display="none";*/
}
add_blog=()=>
{
	document.getElementById('app').innerHTML='<div class="content">'+
                '<h1 class="title">Publish a blog post</h1>'+
                '<div class="content row_style"><button class="btn" id="upload_btn" onclick=openFilePicker2()>Upload Photo</button></div>'+
                '<input type="text" placeholder="Enter Header/Title" style="width: 60vw;" id="b_title">'+
                '<label>Body</label>'+
                '<textarea placeholder="Content Description" style="width: 60vw;min-height:50vh; " id="b_body"></textarea>'+
                '<div class="content row_style"><button class="btn" onclick=upload_blog()>Update</button><button class="btn" onclick=admin_ability()>Cancel</button></div>'+
            '</div>';
}
auth_user=()=>
{

	document.getElementById('app').innerHTML=' <div class="content"><label>Staff Email</label>'+
                '<input type="Email" id="Auth_email" placeholder="johnDoe@gmail.com">'+
                '<label>Password</label>'+
                '<input type="Password" id="Auth_password" placeholder=""></div><button class="btn" id="login" onclick=loginAccess()>Login</button>';
}
admin_ability=()=>
{
	document.getElementById('app').innerHTML='<div class="content2"> <div class="menu_option" onclick=open_blogs()>'+
                    '<img src="img/edit_blog.svg">'+
                    '<p>Published Blogs</p>'+
                '</div>'+
                '<div class="menu_option" onclick=add_blog()>'+
                    '<img src="img/write_blog.svg">'+
                    '<p>Write a Blog</p>'+
                '</div>'+
                '<div class="menu_option" onclick=confirm_ticket()>'+
                    '<img src="img/book_ticket.svg">'+
                    '<p>Confirm A Ticket</p>'+
                '</div>'+
                '<div class="menu_option" onclick=open_events()>'+
                    '<img src="img/edit_event.svg">'+
                    '<p>Published Events</p>'+
                '</div>'+
                '<div class="menu_option" onclick=add_event()>'+
                    '<img src="img/add_event.svg">'+
                    '<p>Add An Event</p>'+
                '</div></div><div class="content row_style"><button class="btn" >Website</button><button class="btn" id="logout" onclick=logoutAccess()>Logout</button><button class="btn" id="logout" >FAQ</button></div>';
}
upload_event=()=>
{
	var d = new Date();
  	var hrs=d.getHours();
  	var mins=d.getMinutes();
  	var sec=d.getSeconds();
  	var date=d.getDate();
  	var month=d.getMonth();
  	var year=d.getYear();
  	var t_date=date+"-"+month+"-"+year;
  	var email=document.getElementById('e_title').value;
  	var loc=document.getElementById('e_location').value;
  	var pri=document.getElementById('e_price').value;
  	var des=document.getElementById('e_description').value;
	var user=database.ref("/events/");
	if(email==""||loc==""||pri==""||des==""||picture=="")
	{
		alert("You are required to complete the form and upload an image!");
	}
	else
	{
			/*user.update*/
	    user.push({
	        title:[email],
	        location:[loc],
	        price:[pri],
	        image:[picture],
	        body:[des],
	        published:[t_date]

	    });
	    alert("Event has been added!");
	    admin_ability();
	}
    
}
remove_blog=(x)=>
{
	var accessed2=database.ref("/blogs/"+x);
      accessed2.remove();
     blog_reader();
}
remove_event=(x)=>
{
	var accessed2=database.ref("/events/"+x);
      accessed2.remove();
     event_reader();
}
upload_blog=()=>
{
	var d = new Date();
  	var hrs=d.getHours();
  	var mins=d.getMinutes();
  	var sec=d.getSeconds();
  	var date=d.getDate();
  	var month=d.getMonth();
  	var year=d.getYear();
  	var t_date=date+"-"+month+"-"+year;
  	var title=document.getElementById('b_title').value;
  	var body=document.getElementById('b_body').value;
  	
	var user=database.ref("/blogs/");
	if(title==""||body==""||picture=="")
	{
		alert("You are required to complete the form and upload an image!");
	}
	else
	{
			/*user.update*/
	    user.push({
	        title:[title],
	        image:[picture],
	        body:[body],
	        published:[t_date]

	    });
	    alert("Blog has been added!");
	    admin_ability();
	}
    
}
event_reader=()=>
{
	document.getElementById('events_c').innerHTML="";
	var accessed = database.ref("/events/");
  	accessed.off();
  	accessed.on("child_added",function(data)
  	{
    	var newdata=data.val();
    	var key=data.key;
    	var count=data.numChildren();
    	console.log(newdata);
    	document.getElementById('events_c').innerHTML+='<div class="blog_content">'+
                        '<img class="blog_img" src="'+newdata.image[0]+'">'+
                        '<h1 class="blog_title">'+newdata.title[0]+'</h1>'+
                        '<p class="blog_des" style="text-align: left;font-weight:bold; color:#027D61;">Location : '+newdata.location[0]+'</p>'+
                        '<p class="blog_des" style="text-align: left;font-weight:bold; color:#027D61;">Price : $'+newdata.price[0]+'</p>'+
                        '<p class="blog_des" style="text-align: left;text-transform:none;">'+newdata.body[0]+'</p>'+
                        '<button class="btn" onclick=remove_event("'+key+'")>Delete</button>'+
                    '</div>';

  },function(error)
  {
  	Alert("No Event");
    
  });
}
event_Data=()=>
{
    document.getElementById('event_list').innerHTML="";
    var accessed = database.ref("/events/");
    accessed.off();
    accessed.on("child_added",function(data)
    {
        var newdata=data.val();
        var key=data.key;
        var count=data.numChildren();
        //console.log(newdata);
        document.getElementById('event_list').innerHTML+='<option value="'+key+'">'+newdata.title[0]+'</option>';

  },function(error)
  {
    document.getElementById('event_list').innerHTML+='<option value="null">No Event is available</option>';
    
  });
}
event_Data_reader=(x)=>
{
    document.getElementById('card').innerHTML="";
    var accessed = database.ref("/events/"+x);
    accessed.off();
    accessed.on("value",function(data)
    {
        var newdata=data.val();
        var key=data.key;
        var count=data.numChildren();
        console.log(newdata.price[0]);
        document.getElementById('card').innerHTML='<p class="blog_des" style="text-align: left;font-weight:bold; color:#027D61;">Location : '+newdata.location[0]+'</p>'+
                        '<p class="blog_des" style="text-align: left;font-weight:bold; color:#027D61;">Price : $ '+newdata.price[0]+' </p>';

  },function(error)
  {
    document.getElementById('card').innerHTML+='<option value="null">No Event is available</option>';
    
  });
}
blog_reader=()=>
{
	document.getElementById('blogs_c').innerHTML="";
	var accessed = database.ref("/blogs/");
  	accessed.off();
  	accessed.on("child_added",function(data)
  	{
    	var newdata=data.val();
    	var key=data.key;
    	var count=data.numChildren();
    	console.log(key);
    	document.getElementById('blogs_c').innerHTML+='<div class="blog_content">'+
                        '<img class="blog_img" src="'+newdata.image[0]+'">'+
                        '<h1 class="blog_title" style="text-align: left;font-weight:bold;">'+newdata.title[0]+'</h1>'+
                        '<p class="blog_des" style="text-align: left;text-transform:none; color:#666;">'+newdata.body[0]+'</p>'+
                        '<button class="btn" onclick=remove_blog("'+key+'")>Delete</button>'+
                    '</div>';

  },function(error)
  {
  	Alert("no blogs");
    
  });
}
function setOptions(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true
    }
    return options;
}

function openFilePicker1() {
	var ref = firebase.storage();
    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions(srcType);
    //var func = createNewFileEntry;

    navigator.camera.getPicture(function cameraSuccess(imageUri) {

        // Do something
        //alert(imageUri);
        //console.log(imageUri);
        //var x="data:image/jpeg;base64," + imageData;
        uploadImage("data:image/jpeg;base64," +imageUri,"events");
        

    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}
function openFilePicker2() {
	var ref = firebase.storage();
    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions(srcType);
    //var func = createNewFileEntry;

    navigator.camera.getPicture(function cameraSuccess(imageUri) {

        // Do something
        //alert(imageUri);
        //console.log(imageUri);
        //var x="data:image/jpeg;base64," + imageData;
        uploadImage("data:image/jpeg;base64," +imageUri,"blogs");
        

    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}
uploadImage=(x,path)=>
{
  var d = new Date();
  var hrs=d.getHours();
  var mins=d.getMinutes();
  var sec=d.getSeconds();
  var date=d.getDate();
  var month=d.getMonth();
  var year=d.getYear();
  var result=date+""+""+month+""+""+year+""+hrs+""+mins+""+sec;
  //////console.log(result);
  var storageRef = firebase.storage().ref(""+path+"/");
  var imgRef=storageRef.child(result);
  imgRef.putString(x,'data_url').then(function(snapshot)
  {
    var photoRef = storageRef.child(result);

    // Get the download URL
    photoRef.getDownloadURL().then(function(url) {
    picture=url;
    document.getElementById('upload_btn').innerHTML="Photo Added Successfully"
    
    //console.log(url);

    })
    
  });
}
