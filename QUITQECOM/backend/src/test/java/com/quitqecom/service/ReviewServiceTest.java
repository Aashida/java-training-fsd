package com.quitqecom.service;

import com.quitqecom.dto.ReviewResponseDto;
import com.quitqecom.model.*;
import com.quitqecom.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ReviewServiceTest {

    @Mock
    private ReviewRepository reviewRepository;

    @Mock
    private ProductRepository productRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private OrderItemRepository orderItemRepository;

    @InjectMocks
    private ReviewService reviewService;

    private Product product;
    private Customer customer;
    private Review review;
    private Review review1;

    @BeforeEach
    public void sampleData() {

        product = new Product();
        product.setId(1);

        customer = new Customer();
        customer.setId(1);
        customer.setFirstName("Aashi");

        review = new Review();
        review.setProduct(product);
        review.setCustomer(customer);
        review.setRating(5);
        review.setComment("Excellent Product");

        review1 = new Review();
        review1.setProduct(product);
        review1.setCustomer(customer);
        review1.setRating(4);
        review1.setComment("Good Product");
    }

    @Test
    public void getProductReviews_MustReturnSomething() {

        when(productRepository.findById(1))
                .thenReturn(Optional.of(product));

        when(reviewRepository.findByProduct(product))
                .thenReturn(List.of(review, review1));

        List<ReviewResponseDto> actualCall =
                reviewService.getProductReviews(1);

        assertThat(actualCall).hasSize(2);

        assertThat(actualCall.getFirst().customerName())
                .isEqualTo("Aashi");

        assertThat(actualCall.getFirst().rating())
                .isEqualTo(5);

        assertThat(actualCall.get(1).rating())
                .isEqualTo(4);
    }

    @Test
    public void getProductReviews_ReturnsEmptyList() {

        when(productRepository.findById(1))
                .thenReturn(Optional.of(product));

        when(reviewRepository.findByProduct(product))
                .thenReturn(List.of());

        List<ReviewResponseDto> actualCall =
                reviewService.getProductReviews(1);

        assertThat(actualCall).isEmpty();
        assertThat(actualCall).hasSize(0);
    }

    @Test
    public void getProductReviews_ProductDoesNotExist() {

        when(productRepository.findById(1))
                .thenReturn(Optional.empty());

        assertThatThrownBy(
                () -> reviewService.getProductReviews(1)
        )
                .isInstanceOf(RuntimeException.class)
                .hasMessage("Product not found");
    }

    @Test
    public void getAverageRating_MustReturnRating() {

        when(reviewRepository.getAverageRating(1))
                .thenReturn(4.5);

        Double actualCall =
                reviewService.getAverageRating(1);

        assertThat(actualCall)
                .isEqualTo(4.5);
    }

    @Test
    public void getAverageRating_ReturnsZero() {

        when(reviewRepository.getAverageRating(1))
                .thenReturn(0.0);

        Double actualCall =
                reviewService.getAverageRating(1);

        assertThat(actualCall)
                .isEqualTo(0.0);
    }
}