<?php
namespace Drupal\responsive_image_map\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Response;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\OpenModalDialogCommand;

/**
 * Provides route responses for the responsive_image_map module.
 */
class ResponsiveImageMap extends ControllerBase {

  /**
   * Returns a Mapper Generator page.
   *
   * @return array
   *   A simple renderable array.
   */
  public function easyMapperGenerator() {
    $url = \Drupal::request()->query->get('url');
    $build = [
      'page' => [
        '#theme' => 'easy_mapper_generator',
        '#url' => $url,
      ],
    ];
    $html = \Drupal::service('renderer')->renderRoot($build);
    $response = new Response();
    $response->setContent($html);
  
    return $response;
  }

  /**
   * Entity view.
   *
   * @return array
   *   A simple renderable array.
   */
  public function entityView($entity_type, $entity_id, $view_mode) {
    $entity = \Drupal::entityTypeManager()->getStorage($entity_type)->load($entity_id);
    $view = entity_view($entity, $view_mode);
    $html = render($view);

    return [
      '#markup' => $html,
    ];
  }

}
