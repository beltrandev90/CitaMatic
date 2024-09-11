<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

header('Access-Control-Allow-Origin: *');
header(
    'Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method'
);
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Allow: GET, POST, OPTIONS, PUT, DELETE');
$method = $_SERVER['REQUEST_METHOD'];
if ($method == 'OPTIONS') {
    die();
}

class Login extends ResourceController
{
    protected $modelName = 'App\Models\LogueoModel';
    protected $format = 'json';
    protected $table = 'negocios';
    protected $primaryKey = 'id_negocio';

    public function index()
    {
        $db = \Config\Database::connect();
    
        // Encriptar la contraseña
        $password = hash('sha512', $this->request->getPost('password'));
    
        // Recoger los datos del POST
        $data = [
            'email'    => $this->request->getPost('email'),
            'password' => $password,
        ];
    
        // Cambiar la tabla de usuarios a negocios
        $builder = $db->table('negocios');
        $builder->select('id_negocio, email'); // Asegúrate de seleccionar los campos correctos de tu tabla
        $builder->where($data);
        $query = $builder->get()->getResultArray();
    
        if (count($query) > 0) {
            return $this->respond([
                'code'       => 200,
                'data'       => $query,
                'authorized' => 'SI',
                'texto'      => 'LOGUEADO CORRECTAMENTE',
            ]);
        } else {
            return $this->respond([
                'code'       => 500,
                'data'       => $query,
                'authorized' => 'NO',
                'texto'      => 'NINGUN NEGOCIO CON ESOS DATOS',
            ]);
        }
    }
    
    
    

}
