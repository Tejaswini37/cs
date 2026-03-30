<h2>Edit Student</h2>

<form action="/students/{{$student->id}}" method="POST">
    @csrf
    @method('PUT')
    <input type="text" name="name" value="{{$student->name}}" placeholder="Name">
    <input type="email" name="email" value="{{$student->email}}" placeholder="Email">
    <input type="number" name="age" value="{{$student->age}}" placeholder="Age">
    <button type="submit">Update</button>
</form>
