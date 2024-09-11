<?php

namespace App\Models;

use CodeIgniter\Model;

class LogueoModel extends Model {
    protected $table = 'negocios';
    protected $primaryKey = 'id_negocio';
    protected $allowedFields = [
        'nombre',
        'email',
        'password',
    ];
}