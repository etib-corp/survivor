<?php

namespace App\EventListener;

use App\Entity\Customer;
use App\Entity\Employee;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;


final class AuthenticationSuccessListener
{
    #[AsEventListener(event: AuthenticationSuccessEvent::class)]
    public function onAuthenticationSuccessEvent(AuthenticationSuccessEvent $event): void
    {
        $data = $event->getData();
        $user = $event->getUser();

        if (!$user instanceof Customer && !$user instanceof Employee) {
            return;
        }
        $data['data'] = array(
            'roles' => $user->getRoles(),
            'email' => $user->getEmail(),
            'id' => $user->getId(),
            'name' => $user->getName(),
            'surname' => $user->getSurname(),
        );

        $event->setData($data);
    }
}
