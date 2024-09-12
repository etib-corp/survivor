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

    // Return the image of the clothe in base64
    #[Route('/api/clothes/base64/{id}', name: 'app_clothe_show')]
    public function show(int $id): JsonResponse
    {
        // $clotheImage = system('base64 -w 0 $(pwd)/images/clothes/'.$id.'.png');
        $clotheImage = base64_encode(file_get_contents('images/clothes/'.$id.'.png'));
        return new JsonResponse(['clothe' => $clotheImage], 200, [
            'Content-Type' => '*/*',
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Methods' => '*',
            'Access-Control-Allow-Headers' => '*',
            'Access-Control-Max-Age' => '3600',
            'Allow' => '*',
        ]);
    }
}
