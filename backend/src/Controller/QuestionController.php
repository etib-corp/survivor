<?php

namespace App\Controller;

use App\Entity\Answer;
use App\Entity\Question;
use App\Entity\Quiz;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Attribute\Route;

#[AsController]
class QuestionController extends AbstractController
{
    #[Route('/api/questions/new', methods: ['POST'])]
    public function newQuestion(EntityManagerInterface $em, Request $request): JsonResponse
    {
        $quizData = json_decode($request->getContent(), true);

        if (!isset($quizData['title'])) {
            return new JsonResponse(['status' => 'error', 'message' => 'Title is missing for the quiz'], 400);
        }
        $quiz = new Quiz();
        $quiz->setTitle($quizData['title']);
        foreach ($quizData['questions'] as $questionIndex => $questionData) {
            if (!isset($questionData['question'])) {
                return new JsonResponse(['status' => 'error', 'message' => 'Question is missing in the question '.$questionIndex], 400);
            }

            if (!isset($questionData['answers'])) {
                return new JsonResponse(['status' => 'error', 'message' => 'Answers are missing in the question '.$questionIndex], 400);
            }

            if (!is_array($questionData['answers'])) {
                return new JsonResponse(['status' => 'error', 'message' => 'Answers should be an array in the question '.$questionIndex], 400);
            }

            if (count($questionData['answers']) < 2) {
                return new JsonResponse(['status' => 'error', 'message' => 'At least 2 answers are required in the question '.$questionIndex], 400);
            }

            if (count($questionData['answers']) > 4) {
                return new JsonResponse(['status' => 'error', 'message' => 'Maximum of 4 answers allowed in the question '.$questionIndex], 400);
            }
            foreach ($questionData['answers'] as $answerIndex => $answerData) {
                if (!isset($answerData['answer'])) {
                    return new JsonResponse(['status' => 'error', 'message' => 'Answer is missing in the answer '.$answerIndex.' of the question '.$questionIndex], 400);
                }
                if (!isset($answerData['correct'])) {
                    return new JsonResponse(['status' => 'error', 'message' => 'Correct flag is missing in the answer '.$answerIndex.' of the question '.$questionIndex], 400);
                }
            }
            $question = new Question();
            $question->setQuestion($questionData['question']);
            foreach ($questionData['answers'] as $answerData) {
                $answer = new Answer();
                $answer->setAnswer($answerData['answer']);
                $answer->setCorrect($answerData['correct']);
                $question->addAnswer($answer);
                $em->persist($answer);
            }
            $quiz->addQuestion($question);
            $em->persist($question);
        }
        $em->persist($quiz);
        $em->flush();
        return new JsonResponse(['status' => 'ok']);
    }
}
