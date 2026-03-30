<h2>Add Student</h2>

<form action="/students" method="POST">
@csrf
<input type="text" name="name" placeholder="Name">
<input type="email" name="email" placeholder="Email">   
<input type="number" name="age" placeholder="Age">
<button type="submit">Submit</button>   
</form>
