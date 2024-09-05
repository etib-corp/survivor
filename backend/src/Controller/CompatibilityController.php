<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use App\Entity\Customer;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;

#[AsController]
class CompatibilityController extends AbstractController
{
    // i want the signs to have a weight for their compatibility like this : sign => number
    private const compatibility_weight = [
        'Bouc' => [
            'Bouc' => 50,
            'Boeuf' => 38,
            'Jumeau' => 83,
            'LaMaladie' => 42,
            'Sautron' => 97,
            'Puceau' => 63,
            'Poucave' => 85,
            'Parfum' => 50,
            'Recto' => 78,
            'Le S' => 93,
            'Cabri' => 47,
            'Saumon' => 67,
        ],
        'Boeuf' => [
            'Bouc' => 38,
            'Boeuf' => 65,
            'Jumeau' => 33,
            'LaMaladie' => 97,
            'Sautron' => 73,
            'Puceau' => 90,
            'Poucave' => 65,
            'Parfum' => 88,
            'Recto' => 58,
            'Le S' => 30,
            'Cabri' => 98,
            'Saumon' => 85,
        ],
        'Jumeau' => [
            'Bouc' => 83,
            'Boeuf' => 33,
            'Jumeau' => 60,
            'LaMaladie' => 65,
            'Sautron' => 88,
            'Puceau' => 68,
            'Poucave' => 93,
            'Parfum' => 28,
            'Recto' => 85,
            'Le S' => 60,
            'Cabri' => 68,
            'Saumon' => 53,
        ],
        'LaMaladie' => [
            'Bouc' => 42,
            'Boeuf' => 97,
            'Jumeau' => 65,
            'LaMaladie' => 75,
            'Sautron' => 35,
            'Puceau' => 90,
            'Poucave' => 43,
            'Parfum' => 94,
            'Recto' => 27,
            'Le S' => 53,
            'Cabri' => 83,
            'Saumon' => 98,
        ],
        'Sautron' => [
            'Bouc' => 97,
            'Boeuf' => 73,
            'Jumeau' => 88,
            'LaMaladie' => 35,
            'Sautron' => 45,
            'Puceau' => 35,
            'Poucave' => 97,
            'Parfum' => 58,
            'Recto' => 68,
            'Le S' => 93,
            'Cabri' => 35,
            'Saumon' => 38,
        ],
        'Puceau' => [
            'Bouc' => 63,
            'Boeuf' => 90,
            'Jumeau' => 68,
            'LaMaladie' => 90,
            'Sautron' => 35,
            'Puceau' => 65,
            'Poucave' => 68,
            'Parfum' => 88,
            'Recto' => 30,
            'Le S' => 48,
            'Cabri' => 95,
            'Saumon' => 88,
        ],
        'Poucave' => [
            'Bouc' => 85,
            'Boeuf' => 65,
            'Jumeau' => 93,
            'LaMaladie' => 43,
            'Sautron' => 97,
            'Puceau' => 68,
            'Poucave' => 75,
            'Parfum' => 35,
            'Recto' => 90,
            'Le S' => 73,
            'Cabri' => 55,
            'Saumon' => 88,
        ],
        'Parfum' => [
            'Bouc' => 50,
            'Boeuf' => 88,
            'Jumeau' => 28,
            'LaMaladie' => 94,
            'Sautron' => 58,
            'Puceau' => 88,
            'Poucave' => 35,
            'Parfum' => 80,
            'Recto' => 73,
            'Le S' => 28,
            'Cabri' => 95,
            'Saumon' => 97,
        ],
        'Recto' => [
            'Bouc' => 78,
            'Boeuf' => 58,
            'Jumeau' => 85,
            'LaMaladie' => 27,
            'Sautron' => 68,
            'Puceau' => 30,
            'Poucave' => 90,
            'Parfum' => 73,
            'Recto' => 45,
            'Le S' => 90,
            'Cabri' => 68,
            'Saumon' => 45,
        ],
        'Le S' => [
            'Bouc' => 93,
            'Boeuf' => 30,
            'Jumeau' => 60,
            'LaMaladie' => 53,
            'Sautron' => 93,
            'Puceau' => 48,
            'Poucave' => 73,
            'Parfum' => 28,
            'Recto' => 90,
            'Le S' => 45,
            'Cabri' => 60,
            'Saumon' => 63,
        ],
        'Cabri' => [
            'Bouc' => 47,
            'Boeuf' => 98,
            'Jumeau' => 68,
            'LaMaladie' => 83,
            'Sautron' => 35,
            'Puceau' => 95,
            'Poucave' => 55,
            'Parfum' => 95,
            'Recto' => 68,
            'Le S' => 60,
            'Cabri' => 75,
            'Saumon' => 88,
        ],
        'Saumon' => [
            'Bouc' => 67,
            'Boeuf' => 85,
            'Jumeau' => 53,
            'LaMaladie' => 98,
            'Sautron' => 38,
            'Puceau' => 88,
            'Poucave' => 88,
            'Parfum' => 97,
            'Recto' => 45,
            'Le S' => 63,
            'Cabri' => 88,
            'Saumon' => 60,
        ],
    ];

    private const translate = [
        'Aries' => 'Bouc',
        'Taurus' => 'Boeuf',
        'Gemini' => 'Jumeau',
        'Cancer' => 'LaMaladie',
        'Leo' => 'Sautron',
        'Virgo' => 'Puceau',
        'Libra' => 'Poucave',
        'Scorpio' => 'Parfum',
        'Sagittarius' => 'Recto',
        'Capricorn' => 'Le S',
        'Aquarius' => 'Cabri',
        'Pisces' => 'Saumon',
    ];

    #[Route('/api/compatibility/{ida}/{idb}', name: 'app_compatibility')]
    public function index(string $ida, string $idb, EntityManagerInterface $entityManager): JsonResponse
    {
        $cusomera = $entityManager->getRepository(Customer::class)->findOneBy(['id' => $ida]);
        $cusomerb = $entityManager->getRepository(Customer::class)->findOneBy(['id' => $idb]);

        if (!$cusomera) {
            return new JsonResponse(['error' => 'Customer '.$ida.' not found'], 404);
        }
        if (!$cusomerb) {
            return new JsonResponse(['error' => 'Customer '.$idb.' not found'], 404);
        }
        $signa = $cusomera->getAstrologicalSign();
        $signb = $cusomerb->getAstrologicalSign();

        if (!array_key_exists($signa, self::translate)) {
            return new JsonResponse(['error' => 'Astrological sign '.$signa.' not found'], 404);
        }
        if (!array_key_exists($signb, self::translate)) {
            return new JsonResponse(['error' => 'Astrological sign '.$signb.' not found'], 404);
        }
        $compatibility = self::compatibility_weight[self::translate[$signa]][self::translate[$signb]];
        $compatibility = $compatibility % 100;
        return new JsonResponse(['compatibility' => $compatibility]);
    }
}
