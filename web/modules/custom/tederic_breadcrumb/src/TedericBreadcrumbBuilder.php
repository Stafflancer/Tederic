<?php

/**
 * @file
 * Contains Drupal\tederic_breadcrumb\TedericBreadcrumbBuilder.
 */

namespace Drupal\tederic_breadcrumb;

use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\Core\Breadcrumb\Breadcrumb;
use Drupal\Core\Breadcrumb\BreadcrumbBuilderInterface;
use Drupal\Core\Link;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\node\NodeInterface;
use Drupal\taxonomy\Entity\Term;

/**
 * Class TedericBreadcrumbBuilder.
 */
class TedericBreadcrumbBuilder implements BreadcrumbBuilderInterface {
  //  Needed for use $this->t().
  use StringTranslationTrait;

  /**
   * {@inheritdoc}
   */
  public function applies(RouteMatchInterface $route_match) {
    $node = $route_match->getParameter('node');
    return $node instanceof NodeInterface;
  }

  /**
   * {@inheritdoc}
   */
  public function build(RouteMatchInterface $route_match) {
    $breadcrumb = new Breadcrumb();
    $node = $route_match->getParameter('node');
    $links = [];

    switch ($node->getType()) {
      case 'product':
        $links[] = Link::createFromRoute($this->t('Products'), '<front>');
        break;
      
      default:
        $links[] = Link::createFromRoute($this->t('Home'), '<front>');
        break;
    }

    $links[] = Link::createFromRoute($node->getTitle(), '<nolink>');

    $breadcrumb->addCacheContexts(['url.path']);
    return $breadcrumb->setLinks($links);
  }
}
