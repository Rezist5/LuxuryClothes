<?php

namespace App\Exceptions;

use Exception;

class StripeException extends Exception
{
    public function render($request)
    {
        return response()->json([
            'message' => 'Ошибка платежной системы',
            'error' => $this->getMessage()
        ], 400);
    }
} 