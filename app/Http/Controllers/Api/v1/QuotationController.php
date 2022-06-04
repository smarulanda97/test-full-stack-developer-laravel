<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQuotationRequest;
use App\Services\QuotationService;

class QuotationController extends Controller {

    /** @var \App\Services\QuotationService */
    protected $quotationService;

    public function __construct(QuotationService $quotationService) {
        $this->middleware('auth:api');
        $this->quotationService = $quotationService;
    }

    /**
     * @param StoreQuotationRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreQuotationRequest $request) {
        return $this->quotationService->generateAndStore($request);
    }
}
