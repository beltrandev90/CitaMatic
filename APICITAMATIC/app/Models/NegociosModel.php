<?php

namespace App\Models;

use CodeIgniter\Model;

class NegociosModel extends Model {
    protected $table = 'negocios';
    protected $primaryKey = 'id_negocio';
    protected $allowedFields = [
        'nombre',
        'email',
        'password',
    ];
}