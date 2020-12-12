<!-- This is the standard foot of a webpage. -->
<footer>
	<h1>Seb Heron Coursework for CSC-20021 - Web Technologies</h1>
</footer>
<div class="dimmer"></div>
<div class="popup" id="login">
	<form id="login-form" class="form">
		<h1>
			<i class="fas fa-user-circle"></i>
		</h1>
		<label id="login-error" class="form-error"l>Username or password incorrect</label>
		<input id="login-username" type="text" placeholder="Username" autocomplete="username">
			<input id="login-password" type="password" placeholder="Password" autocomplete="current-password">
				<button id="login-button" class="submit-button" type="button">Login</button>
				<button class="close-button" type="button">X</button>
				<a id="show-register">Register an account.</a>
			</form>
		</div>
		<div class="popup" id="register">
			<form id="register-form" class="form">
				<h1>
					<i class="fas fa-id-badge"></i>
				</h1>
				<label id="register-error" class="form-error"></label>
				<input id="register-username" type="text" placeholder="Username" autocomplete="off" required>
                <input id="register-password" type="password" placeholder="Password" autocomplete="new-password" required>
                <br/>
                <label for="terms">Agree to terms and conditions?</label>
                <input id="agreebox" type="checkbox" name="terms" required>
                <button id="register-button" class="submit-button" type="button">Register</button>
                <button class="close-button" type="button">X</button>
                <a class="show-login">Login to an account.</a>
            </form>
        </div>
    </div>
    <script src="script/main.js" defer></script>
    <script src="script/login.js" defer></script>
</body>
</html>