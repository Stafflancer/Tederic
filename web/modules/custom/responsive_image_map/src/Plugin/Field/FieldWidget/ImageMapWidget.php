<?php

namespace Drupal\responsive_image_map\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Image\ImageFactory;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Render\ElementInfoManagerInterface;
use Drupal\file\Entity\File;
use Drupal\file\Plugin\Field\FieldWidget\FileWidget;
use Drupal\image\Entity\ImageStyle;

use Drupal\image\Plugin\Field\FieldWidget\ImageWidget;
use Drupal\Core\Url;

/**
 * Plugin implementation of the 'image_map_widget' widget.
 *
 * @FieldWidget(
 *   id = "image_map_widget",
 *   label = @Translation("Image Map"),
 *   field_types = {
 *     "image"
 *   }
 * )
 */
class ImageMapWidget extends ImageWidget {

  /**
   * The image factory service.
   *
   * @var \Drupal\Core\Image\ImageFactory
   */
  protected $imageFactory;

  /**
   * Constructs an ImageWidget object.
   *
   * @param string $plugin_id
   *   The plugin_id for the widget.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\Core\Field\FieldDefinitionInterface $field_definition
   *   The definition of the field to which the widget is associated.
   * @param array $settings
   *   The widget settings.
   * @param array $third_party_settings
   *   Any third party settings.
   * @param \Drupal\Core\Render\ElementInfoManagerInterface $element_info
   *   The element info manager service.
   * @param \Drupal\Core\Image\ImageFactory $image_factory
   *   The image factory service.
   */
  public function __construct($plugin_id, $plugin_definition, FieldDefinitionInterface $field_definition, array $settings, array $third_party_settings, ElementInfoManagerInterface $element_info, ImageFactory $image_factory = NULL) {
    parent::__construct($plugin_id, $plugin_definition, $field_definition, $settings, $third_party_settings, $element_info);
    $this->imageFactory = $image_factory ?: \Drupal::service('image.factory');
  }

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return parent::defaultSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state) {
    $element = parent::settingsForm($form, $form_state);

    return $element;
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $summary = parent::settingsSummary();

    return $summary;
  }

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
    $element = parent::formElement($items, $delta, $element, $form, $form_state);

    return $element;
  }

  /**
   * Form API callback: Processes a image_image field element.
   *
   * Expands the image_image type to include the alt and title fields.
   *
   * This method is assigned as a #process callback in formElement() method.
   */
  public static function process($element, FormStateInterface $form_state, $form) {
    $item = $element['#value'];
    $item['fids'] = $element['fids']['#value'];

    $element['#theme'] = 'image_widget';

    // Get uploaded file.
    if (!empty($element['#files']) && $element['#preview_image_style']) {
      $file = reset($element['#files']);
    }
    elseif (!empty($element['#default_image'])) {
      $default_image = $element['#default_image'];
      $file = File::load($default_image['fid']);
    }

    // Skip if no file yet.
    if (empty($file)) {
      return $element;
    }

    $image_uri = $file->getFileUri();
    // TODO: Move load image map image style from settings.
    $style = ImageStyle::load('image_map');
    // Get image style URI.
    $uri = $style->buildUri($image_uri);
    // Get image style URL.
    $img_url = $style->buildUrl($image_uri);
    // Determine image dimensions.
    list($width, $height) = getimagesize($img_url); 
    
    $element['image_map'] = [
      '#theme' => 'responsive_image_map',
      '#src' => $img_url,
      '#width' => $width,
      '#height' => $height,
      '#weight' => 999,
    ];      

    return parent::process($element, $form_state, $form);
  }

}
