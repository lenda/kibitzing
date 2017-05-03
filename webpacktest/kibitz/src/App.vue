<template>
<div id="app">
        {{message}}

        <nav>
            <div class="ui fixed inverted menu">
                <div class="ui container">
                    <a href="#" class="header item">
                        <i class="comments icon"></i>
                        Kibitzing
                    </a>

                    <a v-if="!loggedIn" href="#" class="item">Register</a>
                    <a v-if="!loggedIn" href="#" class="item">Login</a>
                    <a v-else href="#" class="item">{{ 'Hello, ' + activeUser.name }}</a>

                </div>
            </div>
        </nav>
    <div class="ui stackable two column grid" v-if="!loggedIn" id="login-register-forms">
        <div class="row">
            <div class="column">
                <form class="ui form" id="login-form">
                    <h4 class="ui dividing header">Login</h4>
                    <div class=" six wide field">
                        <label>Email</label>
                        <input placeholder="Email" type="email">
                    </div>
                    <div class=" six wide field">
                        <label>Password</label>
                        <input placeholder="Password" type="password">
                    </div>
                    <button type="button" name="button">Login</button>
                    <button type="button" name="button">Login With Google Account</button>
                </form>
            </div>
            <div class="column">
                <form v-if="!loggedIn" class="ui form" id="register-form">
                      <h4 class="ui header">Don't have an account?</h4>
                      <h4 class="ui dividing header">Register</h4>
                        <div class="six wide field">
                            <label>First name</label>
                            <input placeholder="First Name" type="text">
                        </div>
                        <div class=" six wide field">
                            <label>Last name</label>
                            <input placeholder="Last Name" type="text">
                        </div>
                        <div class=" six wide field">
                            <label>Email</label>
                            <input placeholder="Email" type="email">
                        </div>
                        <div class=" six wide field">
                            <label>Password</label>
                            <input placeholder="Password" type="password">
                        </div>
                        <button type="button" name="button">Register</button>
                        <button type="button" name="button">Register With Google Account</button>
                </form>
            </div>
        </div>
    </div>
    <div class="main-content" v-if="loggedIn">
		<div class="ui grid">
			<div class="three wide column left-column">
				<div class="tree">
					<div class="root-folder">
						<i class="angle down icon"></i>
						<i class="folder open icon"></i>root
					</div>
					<div class="sub-folder">
						<i class="angle down icon"></i>
						<i class="folder open icon"></i>subfolder
					</div>
					<div class="pdf">
						<i class="file pdf outline icon"></i>random.pdf
					</div>
					<div class="sub-folder">
						<i class="angle right icon"></i>
						<i class="folder icon"></i>subfolder
					</div>
				</div>
			</div>
			<div class="eight wide column middle-column">
				<div>
  					<button class="ui left labeled icon button" id="prev"><i class="left arrow icon"></i>Prev</button>

  					<button class="ui right labeled icon button" id="next"><i class="right arrow icon"></i>Next</button>
  					&nbsp; &nbsp;
 					 <span>Page: <span id="page_num"></span> / <span id="page_count"></span></span>
				</div>
				<canvas id="the-canvas"></canvas>
			</div>
		<div class="four wide column right-column">
			<div class="ui one stackable cards">
				<div class="ui raised card">
				  <div class="content">
				    <div class="description">
				      <p>This is a fake comment</p>
				    </div>
				  </div>
				  <div class="extra content">
					  <button class="ui primary button">Reply</button>
				    <div class="right floated author">
				      <i class="user big icon"></i> Matt
				    </div>
				  </div>
				</div>
				<div class="ui raised card">

				  <div class="ui form">
				    <textarea placeholder="Type your comment here."></textarea>
				  </div>
				  <div class="extra content">
					  <button class="ui primary button">Submit</button>
				    <div class="right floated author">
				      <i class="user big icon"></i> You
				    </div>
				  </div>
				</div>
			</div>
			</div>
		</div>
	</div>

</div>
</template>

<script>
export default {
    data: function(){
        return {
            message: 'hello world',
            loggedIn: true,
            activeUser: {
                name: 'Ellie',
                pic: null,
                email: null
            }
        }
    }
}
</script>

<style>
#login-register-forms {
    padding-top: 100px;

}

#login-form {
    padding-left: 20%;

}

#register-form {
    padding-left: 20%;

}
.main-content {
   margin-top: 80px;
}
.left-column{
	margin-left: 10px;
}
.middle-column{
	border: 2px solid black;
	height: 100%;
}
.right-column{

}
#the-canvas{
	width: 100%;
	height: 100%;
}
.sub-folder{
	margin-left: 15px;
}
.pdf{
	margin-left: 50px;
}
</style>
