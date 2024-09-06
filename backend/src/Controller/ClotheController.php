<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Clothe;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;

class ClotheController extends AbstractController
{
    #[Route('/api/clothes/type/{type}', name: 'app_clothe')]
    public function index(string $type, EntityManagerInterface $entityManager): JsonResponse
    {
        if (!in_array($type, ['hat', 'top', 'bottom', 'shoes'])) {
            return new JsonResponse(['error' => 'Clothe type '.$type.' not found'], 404);
        }
        if ($type === 'hat') {
            $type = 'hat/cap';
        }
        $clothes = $entityManager->getRepository(Clothe::class)->findBy(['type' => $type]);
        $clothesIds = [];
        foreach ($clothes as $clothe) {
            $clothesIds[] = $clothe->getId();
        }
        return new JsonResponse(['clothes' => $clothesIds]);
    }
}
