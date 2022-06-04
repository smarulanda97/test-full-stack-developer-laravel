<?php

namespace App\Http\Requests;

use App\Rules\CurrencyRule;
use App\Http\Traits\StandardizedResponse;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreQuotationRequest extends FormRequest
{
    use StandardizedResponse;

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize() {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules() {
        return [
            'age' => 'required|string',
            'end_date' => 'required|date_format:Y-m-d',
            'start_date' => 'required|date_format:Y-m-d',
            'currency_id' => ['required', 'string', new CurrencyRule()],
        ];
    }

    /**
     * Defines custom json response when validation fails
     *
     * {@inheritDoc}
     */
    protected function failedValidation(Validator $validator) {
        if ($this->wantsJson() || $this->ajax()) {
            $response = $this->responseJson($validator->errors()->toArray(), 422, 'Invalid request parameters', false);
            throw new HttpResponseException($response);
        }

        parent::failedValidation($validator);
    }
}
