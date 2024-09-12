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
        $quizData = json_decode($request->getContent(false), true);

        if (!isset($quizData['title'])) {
            return new JsonResponse(['status' => 'error', 'message' => 'Title is missing for the quiz'], 400);
        }
        if (!isset($quizData['image'])) {
            return new JsonResponse(['status' => 'error', 'message' => 'Image is missing for the quiz'], 400);
        }
        $quiz = new Quiz();
        $quiz->setTitle($quizData['title']);
        $quiz->setImage('null for now');
        foreach ($quizData['questions'] as $questionIndex => $questionData) {
            if (!isset($questionData['question'])) {
                $em->remove($quiz);
                return new JsonResponse(['status' => 'error', 'message' => 'Question is missing in the question '.$questionIndex], 400);
            }

            if (!isset($questionData['answers'])) {
                $em->remove($quiz);
                return new JsonResponse(['status' => 'error', 'message' => 'Answers are missing in the question '.$questionIndex], 400);
            }

            if (!is_array($questionData['answers'])) {
                $em->remove($quiz);
                return new JsonResponse(['status' => 'error', 'message' => 'Answers should be an array in the question '.$questionIndex], 400);
            }

            if (count($questionData['answers']) < 2) {
                $em->remove($quiz);
                return new JsonResponse(['status' => 'error', 'message' => 'At least 2 answers are required in the question '.$questionIndex], 400);
            }

            if (count($questionData['answers']) > 4) {
                $em->remove($quiz);
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
        if (!file_exists('images/quizzes')) {
            mkdir('images/quizzes', 0777, true);
        }
        $image = $quizData['image'];
        $file = fopen('images/quizzes/'.$quiz->getId().'.png', 'wb');
        fwrite($file, base64_decode($image));
        fclose($file);
        $quiz->setImage('quizzes/'.$quiz->getId().'.png');
        $em->persist($quiz);
        $em->flush();
        return new JsonResponse(['status' => 'ok'], 201, [
            'Access-Control-Allow-Origin' => '*',
            'Allow' => '*',
        ]);
    }

    #[Route('/api/quiz/{id}', methods: ['GET'])]
    public function getAllQuizById(string $id, EntityManagerInterface $em): JsonResponse
    {
        $quiz = $em->getRepository(Quiz::class)->find($id);
        if (!$quiz) {
            return new JsonResponse(['status' => 'error', 'message' => 'Quiz not found'], 404);
        }
        $quizData = [
            'id' => $quiz->getId(),
            'title' => $quiz->getTitle(),
            'image' => base64_encode($quiz->getImage()),
            'questions' => [],
        ];
        foreach ($quiz->getQuestions() as $question) {
            $questionData = [
                'id' => $question->getId(),
                'question' => $question->getQuestion(),
                'answers' => [],
            ];
            foreach ($question->getAnswers() as $answer) {
                $questionData['answers'][] = [
                    'id' => $answer->getId(),
                    'answer' => $answer->getAnswer(),
                    'correct' => $answer->isCorrect(),
                ];
            }
            $quizData['questions'][] = $questionData;
        }
        return new JsonResponse($quizData);
    }
}
