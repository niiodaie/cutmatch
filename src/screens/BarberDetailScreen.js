import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput, Modal } from 'react-native';
import { useTranslation } from 'react-i18next';

const BarberDetailScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { barber, selectedStyle } = route.params;
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [reviews, setReviews] = useState([
    {
      id: 1,
      userName: "Alex M.",
      rating: 5,
      comment: "Amazing fade! Exactly what I wanted. Will definitely come back.",
      date: "2 days ago",
      hairstyle: "Fade Cut"
    },
    {
      id: 2,
      userName: "Jordan K.",
      rating: 4,
      comment: "Great service and friendly staff. The cut was good but took a bit longer than expected.",
      date: "1 week ago",
      hairstyle: "Classic Cut"
    },
    {
      id: 3,
      userName: "Sam R.",
      rating: 5,
      comment: "Best barber in the area! They really know how to work with curly hair.",
      date: "2 weeks ago",
      hairstyle: "Curly Trim"
    }
  ]);

  const renderStars = (rating, interactive = false, onPress = null) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => interactive && onPress && onPress(i)}
          disabled={!interactive}
        >
          <Text style={[styles.star, i <= rating && styles.filledStar]}>
            {i <= rating ? '⭐' : '☆'}
          </Text>
        </TouchableOpacity>
      );
    }
    return <View style={styles.starsContainer}>{stars}</View>;
  };

  const submitReview = () => {
    if (newReview.comment.trim() === '') {
      Alert.alert('Error', 'Please write a comment for your review.');
      return;
    }

    const review = {
      id: reviews.length + 1,
      userName: "You",
      rating: newReview.rating,
      comment: newReview.comment,
      date: "Just now",
      hairstyle: selectedStyle?.name || "Custom Style"
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '' });
    setShowReviewModal(false);
    Alert.alert('Success', 'Your review has been submitted!');
  };

  const bookAppointment = () => {
    Alert.alert(
      'Book Appointment',
      `Would you like to book an appointment at ${barber.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Call Now', 
          onPress: () => Alert.alert('Calling', `Calling ${barber.phone}...`)
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Barber Info */}
        <View style={styles.barberInfo}>
          <Text style={styles.barberName}>{barber.name}</Text>
          <Text style={styles.address}>{barber.address}</Text>
          <Text style={styles.distance}>{barber.distance} km away</Text>
          
          <View style={styles.ratingContainer}>
            {renderStars(Math.floor(barber.rating))}
            <Text style={styles.rating}>
              {barber.rating} ({barber.reviewCount} reviews)
            </Text>
          </View>

          <View style={styles.contactInfo}>
            <Text style={styles.phone}>📞 {barber.phone}</Text>
            <Text style={styles.priceRange}>💰 {barber.priceRange}</Text>
          </View>
        </View>

        {/* Specialties */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specialties</Text>
          <View style={styles.specialtiesContainer}>
            {barber.specialties.map((specialty, index) => (
              <View key={index} style={styles.specialtyTag}>
                <Text style={styles.specialtyText}>{specialty}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Selected Style */}
        {selectedStyle && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Selected Style</Text>
            <View style={styles.selectedStyleCard}>
              <Text style={styles.selectedStyleName}>{selectedStyle.name}</Text>
              <Text style={styles.selectedStyleType}>{selectedStyle.hairType}</Text>
            </View>
          </View>
        )}

        {/* Reviews */}
        <View style={styles.section}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Reviews ({reviews.length})</Text>
            <TouchableOpacity 
              style={styles.addReviewButton}
              onPress={() => setShowReviewModal(true)}
            >
              <Text style={styles.addReviewText}>+ Add Review</Text>
            </TouchableOpacity>
          </View>

          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewerName}>{review.userName}</Text>
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
              {renderStars(review.rating)}
              <Text style={styles.reviewComment}>{review.comment}</Text>
              <Text style={styles.reviewHairstyle}>Style: {review.hairstyle}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.bookButton} onPress={bookAppointment}>
          <Text style={styles.bookButtonText}>📅 Book Appointment</Text>
        </TouchableOpacity>
      </View>

      {/* Review Modal */}
      <Modal
        visible={showReviewModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowReviewModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Write a Review</Text>
            
            <Text style={styles.ratingLabel}>Rating:</Text>
            {renderStars(newReview.rating, true, (rating) => 
              setNewReview({...newReview, rating})
            )}

            <Text style={styles.commentLabel}>Comment:</Text>
            <TextInput
              style={styles.commentInput}
              multiline
              numberOfLines={4}
              placeholder="Share your experience..."
              value={newReview.comment}
              onChangeText={(text) => setNewReview({...newReview, comment: text})}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowReviewModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.submitButton}
                onPress={submitReview}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  barberInfo: {
    padding: 20,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  barberName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 5,
  },
  distance: {
    fontSize: 14,
    color: '#6A0DAD',
    fontWeight: '600',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  star: {
    fontSize: 20,
    marginRight: 2,
  },
  filledStar: {
    color: '#FFD700',
  },
  rating: {
    fontSize: 16,
    color: '#333333',
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  phone: {
    fontSize: 16,
    color: '#333333',
  },
  priceRange: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialtyTag: {
    backgroundColor: '#E8E0FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 8,
  },
  specialtyText: {
    fontSize: 14,
    color: '#6A0DAD',
    fontWeight: '500',
  },
  selectedStyleCard: {
    backgroundColor: '#F0F8FF',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#6A0DAD',
  },
  selectedStyleName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  selectedStyleType: {
    fontSize: 14,
    color: '#666666',
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  addReviewButton: {
    backgroundColor: '#6A0DAD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  addReviewText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  reviewCard: {
    backgroundColor: '#F8F8F8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  reviewDate: {
    fontSize: 12,
    color: '#666666',
  },
  reviewComment: {
    fontSize: 14,
    color: '#333333',
    marginTop: 8,
    lineHeight: 20,
  },
  reviewHairstyle: {
    fontSize: 12,
    color: '#6A0DAD',
    marginTop: 5,
    fontStyle: 'italic',
  },
  actionButtons: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  bookButton: {
    backgroundColor: '#6A0DAD',
    paddingVertical: 15,
    borderRadius: 25,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  commentLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 20,
    marginBottom: 10,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    flex: 0.45,
  },
  cancelButtonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#6A0DAD',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    flex: 0.45,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BarberDetailScreen;

