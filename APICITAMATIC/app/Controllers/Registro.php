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

class Registro extends ResourceController
{
    protected $modelName  = 'App\Models\NegociosModel';
    protected $format     = 'json';
    protected $table      = 'negocios';
    protected $primaryKey = 'id_negocio';
    
    public function index()
    {
        $db = \Config\Database::connect();
        $builder = $db->table('negocios');
    
        $data = [
            'nombre'    => $this->request->getPost('nombre'),
            'email'     => $this->request->getPost('email'),
            'password'  => hash('sha512', $this->request->getPost('password')),
        ];
    
        $builder->select('email');
        $builder->where('email', $data['email']); // Verifica si el correo ya existe
        $query = $builder->get()->getResultArray();
    
        if (empty($query)) {
            
            $this->model->insert($data);
            $idNegocio = $db->insertID(); 
    
            return $this->respond([
                'code'       => 200,
                'data'       => $data,
                'idNegocio'  => $idNegocio, 
                'authorized' => 'SI',
                'texto'      => 'Registro realizado con exito',
            ]);
        } else {
            // El correo ya existe, devuelve un error
            return $this->respond([
                'code'       => 500,
                'data'       => $query,
                'authorized' => 'NO',
                'texto'      => 'Negocio ya existe',
            ]);
        }
    }

    public function getNegocios() {
        $db4 = \Config\Database::connect();

        $query = $db4->query("SELECT * FROM negocios");

        return $this->respond($query->getResult());
    }

}