class Vector2{

	constructor(x, y){
		this.x = x
		this.y = y
	}

}

class Vector3{
	constructor(x, y, z){
		this.x = x
		this.y = y
		this.z = z
	}

}


//angles
let alpha = 1;



function matrix_multiply(A, B){
	//luckily i only have to implement a 3x3 matrix multiplication with a 3x1 matrix
	//return a new Vector3
	let vec = new Vector3(0, 0, 0);

	let components = []
	let i = 0;
	while(i < 3){
		components[i] = A[i][0] * B.x + A[i][1] * B.y + A[i][2] * B.z;
		i++;
	}

	vec.x = components[0];
	vec.y = components[1];
	vec.z = components[2];

	return vec;
}

function translate_cube_centre(vec3){

	//origin - new origin
	//vec3 - translate to a new vector

	let vec = new Vector3(0, 0, 0);
	
	vec3.x = vec3.x - cube_centre.x
	vec3.y = vec3.y - cube_centre.y
	vec3.z = vec3.z - cube_centre.z

}


function translate_camera(vec3){
	
	let vec = new Vector3(0, 0, 0);

	vec3.x = vec3.x + cube_centre.x
	vec3.y = vec3.y + cube_centre.y
	vec3.z = vec3.z + cube_centre.z

}



//rotate in x - axis
function rotate_vertex_x(vector3, angle){

	rotation_matrix = [[1, 0, 0], [0, cos(angle), -sin(angle)], [0, sin(angle), cos(angle)]];

	//implement matrix multiplication
	let rotated_vertex = matrix_multiply(rotation_matrix, vector3);
	vector3.x = rotated_vertex.x;
	vector3.y = rotated_vertex.y;
	vector3.z = rotated_vertex.z;

}

function rotate_vertex_y(vector3, angle){
	rotation_matrix = [[cos(angle), 0, sin(angle)], [0, 1, 0], [-sin(angle), 0, cos(angle)]]

	let rotated_vertex = matrix_multiply(rotation_matrix, vector3);
	vector3.x = rotated_vertex.x;
	vector3.y = rotated_vertex.y;
	vector3.z = rotated_vertex.z;
}

function rotate_vertex_z(vector3, angle){
	rotation_matrix = [[cos(angle), -sin(angle), 0], [sin(angle), cos(angle), 0], [0, 0, 1]]

	let rotated_vertex = matrix_multiply(rotation_matrix, vector3);
	vector3.x = rotated_vertex.x;
	vector3.y = rotated_vertex.y;
	vector3.z = rotated_vertex.z;
}

function rotate_vertices_x(vertices, angle){
	let i = 0;
	while(i < vertices.length){
		rotate_vertex_x(vertices[i], angle);
		i++;
	}
}


function rotate_vertices_y(vertices, angle){
	let i = 0;
	while(i < vertices.length){
		rotate_vertex_y(vertices[i], angle);
		i++;
	}
}

function rotate_vertices_z(vertices, angle){
	let i = 0;
	while(i < vertices.length){
		rotate_vertex_z(vertices[i], angle);
		i++;
	}
}




let d = 50//how far the screen is from the camera in z direction


//3d cube
let vertices = [
	new Vector3(-200, 200, 250),
	new Vector3(200, 200, 250),
	new Vector3(-200, -200, 250),
	new Vector3(200, -200, 250),

	new Vector3(-200, 200, 650),
	new Vector3(200, 200, 650),
	new Vector3(-200, -200, 650),
	new Vector3(200, -200, 650),
];

let cube_centre = new Vector3(0, 0, 450); //to be the centre

function project(d, vector3, vector2){
	//d - distance between camera and screen in the z direction
	//vector3 - the vector to be projected
	//vector2 - the vector to be updated after projection

	let scale = d/vector3.z;
	vector2.x = scale * vector3.x;
	vector2.y = scale * vector3.y;

	return vector2;
}

function translate_to_plane(vector2){
	vector2.x = vector2.x + 350;
	vector2.y = 350 - vector2.y;
	return vector2;
}

//2d points
let points = [

	translate_to_plane(project(d, vertices[0], new Vector2(0, 0))),
	translate_to_plane(project(d, vertices[1], new Vector2(0, 0))),
	translate_to_plane(project(d, vertices[2], new Vector2(0, 0))),
	translate_to_plane(project(d, vertices[3], new Vector2(0, 0))),
	translate_to_plane(project(d, vertices[4], new Vector2(0, 0))),
	translate_to_plane(project(d, vertices[5], new Vector2(0, 0))),
	translate_to_plane(project(d, vertices[6], new Vector2(0, 0))),
	translate_to_plane(project(d, vertices[7], new Vector2(0, 0)))

];

function update_points(){
	let i = 0; 
	while(i < vertices.length){
		points[i] = translate_to_plane(project(d, vertices[i], points[i]));
        i++;
	}
}


let edges = [
	[points[0], points[1]],
	[points[1], points[3]],
	[points[3], points[2]],
	[points[2], points[0]],

	[points[4], points[6]],
	[points[4], points[5]],
	[points[5], points[7]],
	[points[7], points[6]],

	[points[4], points[0]],
	[points[5], points[1]],
	[points[6], points[2]],
	[points[7], points[3]]
];

function setup() {
	canvas = createCanvas(700, 700);
	canvas.position(20, 20);
	background(0);
	frameRate(10);
	angleMode(DEGREES);
}

function draw() {
    background(0);
	stroke("white");
	strokeWeight(5);
	fill(255, 255, 255);

	let i = 0;
	let points_y = 550;
	while(i < points.length){
		strokeWeight(10);
		point(points[i].x, points[i].y);
		strokeWeight(0);
		text(points[i].x, 20, points_y);
		text(points[i].y, 300, points_y);
		points_y += 20;
		i++;
	}


	i = 0;
	while(i < edges.length){
		strokeWeight(3);
		line(edges[i][0].x, edges[i][0].y, 
			edges[i][1].x, edges[i][1].y);
		i++;
	}

		translate_vertices_to_cube_centre(vertices)
		rotate_vertices_x(vertices, alpha);
		//rotate_vertices_y(vertices, alpha);
		//rotate_vertices_z(vertices, alpha);

		translate_vertices_to_camera(vertices)
		update_points();
}

function translate_vertices_to_cube_centre(){
	//holy shit i never named a function like that
	let i = 0
	while(i < vertices.length){
		translate_cube_centre(vertices[i])
		i++
	}
}

function translate_vertices_to_camera(){
	let i = 0
	while(i < vertices.length){
		translate_camera(vertices[i])
		i++
	}
}