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

    add(vec3){
       this.x += vec3.x
       this.y += vec3.y
       this.z += vec3.z
    }

    negative(){
        return new Vector3(-this.x, -this.y, -this.z)
    }

    update(x, y, z){
        this.x = x
        this.y = y
        this.z = z
    }
    update(vec3){
        this.x = vec3.x
        this.y = vec3.y
        this.z = vec3.z
    }
}

let matrix_multiplication = function(a, b){
    //return a new vector3
    //a is strictly 3*3
    //b is strictly 3*1
    let vec = new Vector3(0, 0, 0)
    let components = []

    let i = 0;
    while(i < 3){
        components[i] = (a[i][0] * b.x)
                    + (a[i][1] * b.y)
                    + (a[i][2] * b.z);
        i++;
    }

    vec.x = components[0]
    vec.y = components[1]
    vec.z = components[2]

    return vec
}

function translate_origin(a, new_origin, old_origin){
    //vector - vector in old coordinate plane - update inplace
    //old_origin - origin in the old coordinate plane (Vector3)
    //new_origin - origin in the new coordinate plane (Vector3)
    //update to a vector in the new coordinate plane

    let b = new_origin.add(old_origin.negative())
    a.add(b.negative());
}


//test this function

function setup(){
    let a = new Vector3(20, 20, 40)
    translate_origin(a, new Vector3(0, 0, 40), new Vector3(0, 0, 0))
    console.log(a)
}

function draw(){

}