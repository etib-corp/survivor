<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class SecurityController extends AbstractController
{
    #[Route('/api/token_check', name: 'app_security_token_check', methods: ['GET'])]
    public function index(): JsonResponse
    {
        return new JsonResponse(['valid' => true]);
    }
}
