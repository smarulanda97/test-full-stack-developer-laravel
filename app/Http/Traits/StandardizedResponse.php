<?php

namespace App\Http\Traits;

trait StandardizedResponse
{
    /**
     * Returns a standardized response of json
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function responseJson(array $data, int $status = 200, string $message = '', bool $success = true) {
        $responseData = [
            'success' => $success,
            'message' => $message,
            'data' => $data,
        ];

        return response()->json($responseData, $status);
    }
}
