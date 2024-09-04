<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Clothe;
use App\Entity\Customer;
use App\Entity\Employee;
use App\Entity\Encounter;
use App\Entity\Event;
use App\Entity\Payment;
use App\Entity\Tip;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api')]
class SyncController extends AbstractController
{
    private HttpClientInterface $httpClient;

    public function __construct(HttpClientInterface $httpClient)
    {
        $this->httpClient = $httpClient;
    }

    private function sendRequest(string $url, string $bearer) : mixed
    {
        $api_key = $_SERVER['API_KEY'];
        $base_url = $_SERVER['BASE_URL'];
        $response = $this->httpClient->request('GET', $base_url.$url, [
            'headers' => [
                'X-Group-Authorization' => $api_key,
                "Accept" => "application/json",
                "Authorization" => "Bearer ".$bearer
            ]
        ]);
        $data = json_decode($response->getContent(), true);
        return $data;
    }

    #[Route('/sync/all', name: 'app_sync_all')]
    public function syncAll(EntityManagerInterface $entityManager): JsonResponse
    {
        $this->syncCustomers($entityManager);
        $this->syncEmployees($entityManager);
        $this->syncClothes($entityManager);
        $this->syncPayments($entityManager);
        $this->syncEncounters($entityManager);
        $this->syncTips($entityManager);
        $this->syncEvents($entityManager);
        return new JsonResponse(['message' => 'All synced'], Response::HTTP_OK);
    }

    #[Route('/sync/clothes', name: 'app_clothe_sync')]
    public function syncClothes(EntityManagerInterface $entityManager): JsonResponse
    {
        $customers = $entityManager->getRepository(Customer::class)->findAll();

        foreach ($customers as $customer) {
            $clotheResponse = $this->sendRequest('/api/customers/'.$customer->getId().'/clothes', '*');
            foreach ($clotheResponse as $clothe) {
                $clotheEntity = null;
                $alreadySyncedClothe = $entityManager->getRepository(Clothe::class)->findOneBy(['id' => $clothe['id']]);
                if ($alreadySyncedClothe !== null) {
                    $clotheEntity = $alreadySyncedClothe;
                }
                if ($clotheEntity === null) {
                    $clotheEntity = new Clothe();
                    $clotheEntity->setId($clothe['id']);
                    $clotheEntity->setType($clothe['type']);
                } else {
                    $clotheEntity->setType($clothe['type']);
                }
                $entityManager->persist($clotheEntity);
            }
        }
        $entityManager->flush();
        return new JsonResponse(['message' => 'Clothes synced'], Response::HTTP_OK);
    }

    #[Route('/sync/customers', name: 'app_customer_sync')]
    public function syncCustomers(EntityManagerInterface $entityManager): JsonResponse
    {
        $customers = $this->sendRequest('/api/customers', '*');

        $alreadySyncedCustomers = $entityManager->getRepository(Customer::class)->findAll();
        foreach ($customers as $customer) {
            $customerEntity = null;
            foreach ($alreadySyncedCustomers as $alreadySyncedCustomer) {
                if ($alreadySyncedCustomer->getId() == $customer['id']) {
                    $customerEntity = $alreadySyncedCustomer;
                }
            }
            $customerResponse = $this->sendRequest('/api/customers/'.$customer['id'], '*');
            $birthDate = new \DateTime($customerResponse['birth_date']);
            if ($customerEntity === null) {
                $customerEntity = new Customer();
                $customerEntity->setId($customerResponse['id']);
                $customerEntity->setName($customerResponse['name']);
                $customerEntity->setEmail($customerResponse['email']);
                $customerEntity->setSurname($customerResponse['surname']);
                $customerEntity->setBirthDate($birthDate);
                $customerEntity->setGender($customerResponse['gender']);
                $customerEntity->setDescription($customerResponse['description']);
                $customerEntity->setAstrologicalSign($customerResponse['astrological_sign']);
            } else {
                $customerEntity->setName($customerResponse['name']);
                $customerEntity->setEmail($customerResponse['email']);
                $customerEntity->setSurname($customerResponse['surname']);
                $customerEntity->setBirthDate($birthDate);
                $customerEntity->setGender($customerResponse['gender']);
                $customerEntity->setDescription($customerResponse['description']);
                $customerEntity->setAstrologicalSign($customerResponse['astrological_sign']);
            }
            $entityManager->persist($customerEntity);
        }
        $entityManager->flush();
        return new JsonResponse(['message' => 'Customers synced'], Response::HTTP_OK);
    }

    #[Route('/sync/employees', name: 'app_employee_sync')]
    public function syncEmployees(EntityManagerInterface $entityManager): JsonResponse
    {
        $employees = $this->sendRequest('/api/employees', '*');

        $alreadySyncedEmployees = $entityManager->getRepository(Employee::class)->findAll();
        foreach ($employees as $employee) {
            $employeeEntity = null;
            foreach ($alreadySyncedEmployees as $alreadySyncedEmployee) {
                if ($alreadySyncedEmployee->getId() == $employee['id']) {
                    $employeeEntity = $alreadySyncedEmployee;
                }
            }
            $employeeResponse = $this->sendRequest('/api/employees/'.$employee['id'], '*');
            $birthDate = new \DateTime($employeeResponse['birth_date']);
            if ($employeeEntity === null) {
                $employeeEntity = new Employee();
                $employeeEntity->setId($employeeResponse['id']);
                $employeeEntity->setName($employeeResponse['name']);
                $employeeEntity->setEmail($employeeResponse['email']);
                $employeeEntity->setSurname($employeeResponse['surname']);
                $employeeEntity->setBirthDate($birthDate);
                $employeeEntity->setGender($employeeResponse['gender']);
                $employeeEntity->setWork($employeeResponse['work']);
            } else {
                $employeeEntity->setName($employeeResponse['name']);
                $employeeEntity->setEmail($employeeResponse['email']);
                $employeeEntity->setSurname($employeeResponse['surname']);
                $employeeEntity->setBirthDate($birthDate);
                $employeeEntity->setGender($employeeResponse['gender']);
                $employeeEntity->setWork($employeeResponse['work']);
            }
            $entityManager->persist($employeeEntity);
        }
        $entityManager->flush();
        return new JsonResponse(['message' => 'Employees synced'], Response::HTTP_OK);
    }

    #[Route('/sync/payments', name: 'app_payment_sync')]
    public function syncPayments(EntityManagerInterface $entityManager): JsonResponse
    {
        $customers = $entityManager->getRepository(Customer::class)->findAll();

        foreach ($customers as $customer) {
            $paymentResponse = $this->sendRequest('/api/customers/'.$customer->getId().'/payments_history', '*');
            // return new JsonResponse($paymentResponse, Response::HTTP_OK);
            foreach ($paymentResponse as $payment) {
                $paymentEntity = null;
                $alreadySyncedPayment = $entityManager->getRepository(Payment::class)->findOneBy(['id' => $payment['id']]);
                if ($alreadySyncedPayment !== null) {
                    $paymentEntity = $alreadySyncedPayment;
                }
                $date = new \DateTime($payment['date']);
                if ($paymentEntity === null) {
                    $paymentEntity = new Payment();
                    $paymentEntity->setId($payment['id']);
                    $paymentEntity->setMethod($payment['payment_method']);
                    $paymentEntity->setAmount($payment['amount']);
                    $paymentEntity->setComment($payment['comment']);
                    $paymentEntity->setDate($date);
                    $paymentEntity->setCustomer($customer);
                } else {
                    $paymentEntity->setMethod($payment['payment_method']);
                    $paymentEntity->setAmount($payment['amount']);
                    $paymentEntity->setComment($payment['comment']);
                    $paymentEntity->setDate($date);
                    $paymentEntity->setCustomer($customer);
                }
                $entityManager->persist($paymentEntity);
            }
        }
        $entityManager->flush();
        return new JsonResponse(['message' => 'Payments synced'], Response::HTTP_OK);
    }

    #[Route('/sync/encounters', name: 'app_encounter_sync')]
    public function syncEncounters(EntityManagerInterface $entityManager): JsonResponse
    {
        $encounters = $this->sendRequest('/api/encounters', '*');

        $alreadySyncedEncounters = $entityManager->getRepository(Encounter::class)->findAll();
        foreach ($encounters as $encounter) {
            $encounterEntity = null;
            foreach ($alreadySyncedEncounters as $alreadySyncedEncounter) {
                if ($alreadySyncedEncounter->getId() == $encounter['id']) {
                    $encounterEntity = $alreadySyncedEncounter;
                }
            }
            $encounterResponse = $this->sendRequest('/api/encounters/'.$encounter['id'], '*');
            $customer = $entityManager->getRepository(Customer::class)->findOneBy(['id' => $encounterResponse['customer_id']]);
            $date = new \DateTime($encounterResponse['date']);
            if ($encounterEntity === null) {
                $encounterEntity = new Encounter();
                $encounterEntity->setId($encounterResponse['id']);
                $encounterEntity->setCustomer($customer);
                $encounterEntity->setDate($date);
                $encounterEntity->setRating($encounterResponse['rating']);
                $encounterEntity->setComment($encounterResponse['comment']);
                $encounterEntity->setSource($encounterResponse['source']);
            } else {
                $encounterEntity->setCustomer($customer);
                $encounterEntity->setDate($date);
                $encounterEntity->setRating($encounterResponse['rating']);
                $encounterEntity->setComment($encounterResponse['comment']);
                $encounterEntity->setSource($encounterResponse['source']);
            }
            $entityManager->persist($encounterEntity);
        }
        $entityManager->flush();
        return new JsonResponse(['message' => 'Encounters synced'], Response::HTTP_OK);
    }

    #[Route('/sync/tips', name: 'app_tip_sync')]
    public function syncTips(EntityManagerInterface $entityManager): JsonResponse
    {
        $tips = $this->sendRequest('/api/tips', '*');

        $alreadySyncedTips = $entityManager->getRepository(Tip::class)->findAll();
        foreach ($tips as $tip) {
            $tipEntity = null;
            foreach ($alreadySyncedTips as $alreadySyncedTip) {
                if ($alreadySyncedTip->getId() == $tip['id']) {
                    $tipEntity = $alreadySyncedTip;
                }
            }
            if ($tipEntity === null) {
                $tipEntity = new Tip();
                $tipEntity->setId($tip['id']);
                $tipEntity->setTitle($tip['title']);
                $tipEntity->setTip($tip['tip']);
            } else {
                $tipEntity->setTitle($tip['title']);
                $tipEntity->setTip($tip['tip']);
            }
            $entityManager->persist($tipEntity);
        }
        $entityManager->flush();
        return new JsonResponse(['message' => 'Tips synced'], Response::HTTP_OK);
    }

    #[Route('/sync/events', name: 'app_event_sync')]
    public function syncEvents(EntityManagerInterface $entityManager): JsonResponse
    {
        $events = $this->sendRequest('/api/events', '*');

        $alreadySyncedEvents = $entityManager->getRepository(Event::class)->findAll();
        foreach ($events as $event) {
            $eventEntity = null;
            foreach ($alreadySyncedEvents as $alreadySyncedEvent) {
                if ($alreadySyncedEvent->getId() == $event['id']) {
                    $eventEntity = $alreadySyncedEvent;
                }
            }
            $eventResponse = $this->sendRequest('/api/events/'.$event['id'], '*');
            $employee = $entityManager->getRepository(Employee::class)->findOneBy(['id' => $eventResponse['employee_id']]);
            $date = new \DateTime($eventResponse['date']);
            if ($eventEntity === null) {
                $eventEntity = new Event();
                $eventEntity->setId($eventResponse['id']);
                $eventEntity->setName($eventResponse['name']);
                $eventEntity->setLocationName($eventResponse['location_name']);
                $eventEntity->setDate($date);
                $eventEntity->setLocationX($eventResponse['location_x']);
                $eventEntity->setLocationY($eventResponse['location_y']);
                $eventEntity->setType($eventResponse['type']);
                $eventEntity->setMaxParticipants($eventResponse['max_participants']);
                $eventEntity->setEmployee($employee);
            } else {
                $eventEntity->setId($eventResponse['id']);
                $eventEntity->setName($eventResponse['name']);
                $eventEntity->setLocationName($eventResponse['location_name']);
                $eventEntity->setDate($date);
                $eventEntity->setLocationX($eventResponse['location_x']);
                $eventEntity->setLocationY($eventResponse['location_y']);
                $eventEntity->setType($eventResponse['type']);
                $eventEntity->setMaxParticipants($eventResponse['max_participants']);
                $eventEntity->setEmployee($employee);
            }
            $entityManager->persist($eventEntity);
        }
        $entityManager->flush();
        return new JsonResponse(['message' => 'Events synced'], Response::HTTP_OK);
    }

}
