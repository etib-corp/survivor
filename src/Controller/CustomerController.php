<?php

namespace App\Controller;

use App\Entity\Customer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class CustomerController extends AbstractController
{
    #[Route('/api/customer/dept/{id}', name: 'app_customer')]
    public function index(string $id, EntityManagerInterface $em): JsonResponse
    {
        $customer = $em->getRepository(Customer::class)->find($id);
        if (!$customer) {
            return new JsonResponse(['error' => 'Customer not found'], 404);
        }
        $address = $customer->getAddress();
        // use regex to extract the department number from the address
        preg_match('/\d{5}/', $address, $matches);
        if (empty($matches)) {
            return new JsonResponse(['error' => 'Department not found in the address'], 404);
        }
        return new JsonResponse(['dept' => $matches[0]]);
    }
}
