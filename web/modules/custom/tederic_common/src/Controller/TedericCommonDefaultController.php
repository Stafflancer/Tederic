<?php

namespace Drupal\tederic_common\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\views\Controller;
use Drupal\views\Views;

/**
 * Class TedericCommonDefaultController.
 */
class TedericCommonDefaultController extends ControllerBase {

  /**
   * Hello.
   *
   * @return string
   *   Return Hello string.
   */
  public function hello($name) {
    return [
      '#type' => 'markup',
      '#markup' => $this->t('Implement method: hello with parameter(s): $name'),
    ];
  }

  public function prevEventsView() {
    $view = Views::getView('events');
    $view->setDisplay('events_list_block');
    // Set Exposed filter argument 
    $view->setArguments([$id]);
    $title = $view->getTitle();
    $render = $view->render();
    $markup = drupal_render($render);
    return new Response($markup);

    $markup = \Drupal::service('renderer')->render(views_embed_view('events', 'events_list_block'));
    return new Response($markup);
  }

}
