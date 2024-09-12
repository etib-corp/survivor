<?php

namespace App\Controller;

use App\Entity\Tip;
use DeepL\Translator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;


class TipController extends AbstractController
{
    #[Route('/api/tips/new', name: 'app_tip_new', methods: ['POST'])]
    public function new(EntityManagerInterface $em, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        // [french, english, espagnol, chinese]
        $title = $data['title'];
        $language = $data['language'];
        $tip = $data['tip'];
        $translated = ["title" => ["FR" => "", "EN-US" => "", "ES" => "", "ZH" => ""], "tip" => ["FR" => "", "EN-US" => "", "ES" => "", "ZH" => ""]];

        $translated['title'][$language] = $title;
        $translated['tip'][$language] = $tip;

        $authKey = $_SERVER['DEEPL_API_KEY'];
        $translator = new Translator($authKey);

        foreach ($translated['title'] as $key => $value) {
            if ($value === "") {
                $translated['title'][$key] = $translator->translateText($title, $language, $key);
                $translated['tip'][$key] = $translator->translateText($tip, $language, $key);
            }
        }

        $newTip = new Tip();
        $concatTitles = "";
        $concatTips = "";
        foreach ($translated['title'] as $key => $value) {
            if ($key === "ZH") {
                $concatTitles .= $value;
            } else {
                $concatTitles .= $value . "||||";
            }
        }
        foreach ($translated['tip'] as $key => $value) {
            if ($key === "ZH") {
                $concatTips .= $value;
            } else {
                $concatTips .= $value . "||||";
            }
        }

        $newTip->setTitle($concatTitles);
        $newTip->setTip($concatTips);

        $em->persist($newTip);
        $em->flush();

        return new JsonResponse(['status' => 'ok']);
    }

    #[Route('/api/tips/edit/{id}', name: 'app_tip_edit', methods: ['PATCH'])]
    public function edit(EntityManagerInterface $em, Request $request, string $id): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $title = $data['title'];
        $tip = $data['tip'];
        $language = $data['language'];
        if ($language === "EN") {
            $language = "EN-US";
        }

        $authKey = $_SERVER['DEEPL_API_KEY'];
        $translator = new Translator($authKey);

        $newTip = $em->getRepository(Tip::class)->find($id);
        $translated = ["title" => ["FR" => "", "EN-US" => "", "ES" => "", "ZH" => ""], "tip" => ["FR" => "", "EN-US" => "", "ES" => "", "ZH" => ""]];

        $translated['title'][$language] = $title;
        $translated['tip'][$language] = $tip;

        if ($language === "EN-US") {
            $language = "EN";
        }

        foreach ($translated['title'] as $key => $value) {
            if ($value === "") {
                $translated['title'][$key] = $translator->translateText($title, $language, $key);
                $translated['tip'][$key] = $translator->translateText($tip, $language, $key);
            }
        }

        $concatTitles = "";
        $concatTips = "";
        foreach ($translated['title'] as $key => $value) {
            if ($key === "ZH") {
                $concatTitles .= $value;
            } else {
                $concatTitles .= $value . "||||";
            }
        }
        foreach ($translated['tip'] as $key => $value) {
            if ($key === "ZH") {
                $concatTips .= $value;
            } else {
                $concatTips .= $value . "||||";
            }
        }


        $newTip->setTitle($concatTitles);
        $newTip->setTip($concatTips);



        $em->persist($newTip);
        $em->flush();

        return new JsonResponse(['status' => 'ok']);
    }
}
